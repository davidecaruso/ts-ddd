import fastify, { FastifyReply, FastifyRequest, FastifyListenOptions } from 'fastify'
import { either, readerTaskEither } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import bootstrap from '../../app/bootstrap'
import { PlaceOrderCommandC } from '../components/order/application/commands/PlaceOrderCommand'
import { PlaceOrderCommandHandler } from '../components/order/application/handlers/PlaceOrderCommandHandler'

export default (app: ReturnType<typeof bootstrap>) =>
  fastify()
    .route({
      method: 'POST',
      url: '/api/v1/orders',
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        return pipe(
          await pipe(
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
          })(),
          either.matchW(
            e => {
              reply.statusCode = 400
              return { error: e instanceof Error ? e.message : JSON.stringify(e) }
            },
            data => {
              reply.statusCode = 201
              return { data }
            },
          ),
        )
      },
    })
    .listen({ port: 8080 } as FastifyListenOptions, (err: Error | null, address: string) => {
      if (err) {
        app.logger.error(err)
        process.exit(1)
      }
      app.logger.info(`Server listening at ${address}`)
    })
