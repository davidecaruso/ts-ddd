import { either, readerTaskEither, readonlyArray, readonlyNonEmptyArray } from 'fp-ts'
import { flow, pipe } from 'fp-ts/function'
import { ReaderTaskEither } from 'fp-ts/ReaderTaskEither'
import { CommandHandler } from '../../../../../../../src/application/handler'
import { Logger } from '../../../../../../../src/application/logging'
import { EventPublisher } from '../../../../../../../src/application/messaging'
import { UserRepository } from '../../../user/application/repositories/UserRepository'
import { Order } from '../../domain/entities/Order'
import { Product } from '../../domain/entities/Product'
import { ProductQuantity } from '../../domain/value-objects/ProductQuantity'
import { PlaceOrderCommand } from '../commands/PlaceOrderCommand'
import { OrderRepository } from '../repositories/OrderRepository'
import { ProductRepository } from '../repositories/ProductRepository'

type Dependencies = {
  logger?: Logger
  eventPublisher: EventPublisher
  userRepository: UserRepository
  orderRepository: OrderRepository
  productRepository: ProductRepository
}

export const PlaceOrderCommandHandler: CommandHandler<
  PlaceOrderCommand,
  ReaderTaskEither<Dependencies, Error, Order>
> = command =>
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
        readerTaskEither.chainFirst(order => readerTaskEither.fromTaskEither(eventPublisher.publish(order.events))),
      ),
    ),
  )
