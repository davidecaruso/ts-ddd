import fastify, { FastifyListenOptions } from 'fastify'
import { AppInstance } from '../../app/app'
import routes from './routes'

export default (app: AppInstance) =>
  fastify()
    .register(routes(app), { prefix: '/api/v1/' })
    .listen({ port: 8080 } as FastifyListenOptions, (err: Error | null, address: string) => {
      if (err) {
        app.logger.error(err)
        process.exit(1)
      }

      app.logger.info(`Server listening at ${address}`)
    })
