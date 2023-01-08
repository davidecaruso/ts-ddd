import { FastifyReply, FastifyRequest } from 'fastify'
import { either, readerTaskEither } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { AppInstance } from '../../../app/app'
import { PlaceOrderCommandC } from '../../components/order/application/commands/PlaceOrderCommand'
import { PlaceOrderCommandHandler } from '../../components/order/application/handlers/PlaceOrderCommandHandler'

export default (app: AppInstance) => async (request: FastifyRequest, reply: FastifyReply) => {
  const result = await pipe(
    request.body,
    PlaceOrderCommandC.decode,
    readerTaskEither.fromEither,
    readerTaskEither.chainW(PlaceOrderCommandHandler),
  )({
    logger: app.logger,
    eventPublisher: app.eventPublisher,
    orderRepository: app.orderRepository,
    productRepository: app.productRepository,
    userRepository: app.userRepository,
  })()

  if (either.isLeft(result)) {
    reply.statusCode = 400
    // Handle other error types
    return { error: result.left instanceof Error ? result.left.message : JSON.stringify(result.left) }
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
