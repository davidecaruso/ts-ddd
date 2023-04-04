import { either, readerTaskEither, readonlyArray, readonlyNonEmptyArray, taskEither } from 'fp-ts'
import { constant, flow, pipe } from 'fp-ts/function'
import { ReaderTaskEither } from 'fp-ts/ReaderTaskEither'
import { application } from '../../../../../../../src'
import { UserRepository } from '../../../user/application/repositories/user.repository'
import { Order } from '../../domain/entities/order'
import { Product } from '../../domain/entities/product'
import { ProductQuantity } from '../../domain/value-objects/product-quantity'
import { PlaceOrderCommand } from '../commands/place-order.command'
import { OrderRepository } from '../repositories/order.repository'
import { ProductRepository } from '../repositories/product.repository'

type Dependencies = {
  logger?: application.logging.Logger
  eventPublisher: application.event.Publisher
  userRepository: UserRepository
  orderRepository: OrderRepository
  productRepository: ProductRepository
}

export const PlaceOrderService = (command: PlaceOrderCommand): ReaderTaskEither<Dependencies, Error, Order> =>
  pipe(
    readerTaskEither.ask<Dependencies>(),
    readerTaskEither.chainW(({ userRepository, productRepository, orderRepository, eventPublisher, logger }) =>
      pipe(
        readerTaskEither.Do,
        readerTaskEither.apS(
          'user',
          pipe(
            userRepository.readOneById(command.userId),
            readerTaskEither.fromTaskEither,
            readerTaskEither.chainEitherK(
              flow(either.fromOption(() => new Error(`Cannot find user "${command.userId.toString()}"`))),
            ),
          ),
        ),
        readerTaskEither.apS(
          'products',
          pipe(
            productRepository.readManyById(
              pipe(
                command.products,
                readonlyNonEmptyArray.map(({ id }) => id),
              ),
            ),
            readerTaskEither.fromTaskEither,
            readerTaskEither.chain(
              flow(
                readonlyArray.traverse(either.Applicative)(product =>
                  pipe(
                    [...command.products],
                    readonlyArray.findFirst(({ id }) => product.id.equals(id)),
                    either.fromOption(() => new Error(`Cannot find quantity for product "${product.name.value}"`)),
                    either.map(({ quantity }) => [product, quantity] as [Product, ProductQuantity]),
                  ),
                ),
                readerTaskEither.fromEither,
                readerTaskEither.chain(
                  flow(
                    readonlyNonEmptyArray.fromReadonlyArray,
                    readerTaskEither.fromOption(() => new Error()),
                  ),
                ),
              ),
            ),
          ),
        ),
        readerTaskEither.bind('order', ({ products, user }) => readerTaskEither.of(Order.create(products, user))),
        readerTaskEither.chainTaskEitherK(({ order, user }) => orderRepository.upsertOne(order)),
        readerTaskEither.chainFirst(order =>
          readerTaskEither.fromTaskEither(
            taskEither.tryCatch(constant(eventPublisher.publish(order.events)), e => {
              logger?.error(e)
              return new Error(`Unable to publish order creation event for ID "${order.id.toString()}".`)
            }),
          ),
        ),
      ),
    ),
  )
