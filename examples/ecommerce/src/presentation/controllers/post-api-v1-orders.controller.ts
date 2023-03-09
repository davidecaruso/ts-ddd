import { FastifyReply, FastifyRequest } from 'fastify'
import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { presentation } from '../../../../../src'
import { AppInstance } from '../../../app/app'
import { PlaceOrderCommand } from '../../components/order/application/commands/PlaceOrderCommand'
import { PlaceOrderCommandHandler } from '../../components/order/application/handlers/PlaceOrderCommandHandler'

export default (app: AppInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  const command = pipe(
    request.body,
    PlaceOrderCommand.decode,
    either.mapLeft(e => new presentation.error.BadRequestError('Some date is invalid', e.toString())),
  )

  if (either.isLeft(command)) {
    reply.statusCode = command.left.status

    return command.left.toJson()
  }

  const result = pipe(
    await PlaceOrderCommandHandler(command.right)({
      logger: app.logger,
      eventPublisher: app.eventPublisher,
      orderRepository: app.orderRepository,
      productRepository: app.productRepository,
      userRepository: app.userRepository,
    })(),
    either.mapLeft(
      e => new presentation.error.InternalServerError('There was an error during order creation', e.toString()),
    ),
  )

  if (either.isLeft(result)) {
    reply.statusCode = result.left.status

    return result.left.toJson()
  }

  reply.statusCode = 201
  return { data: result.right }
}

// export default (app: AppInstance) => async (request: FastifyRequest, reply: FastifyReply) =>
//   pipe(
//     await pipe(
//       request.body,
//       PlaceOrderCommandC.decode,
//       readerTaskEither.fromEither,
//       readerTaskEither.chainW(PlaceOrderCommandHandler),
//     )({
//       logger: app.logger,
//       eventPublisher: app.eventPublisher,
//       orderRepository: app.orderRepository,
//       productRepository: app.productRepository,
//       userRepository: app.userRepository,
//     })(),
//     either.matchW(
//       e => {
//         reply.statusCode = 400
//         return { error: e instanceof Error ? e.message : JSON.stringify(e) }
//       },
//       data => {
//         reply.statusCode = 201
//         return { data }
//       },
//     ),
//   )
