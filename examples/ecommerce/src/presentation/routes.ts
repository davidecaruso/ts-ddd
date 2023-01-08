import { FastifyInstance, FastifyPluginOptions, HookHandlerDoneFunction } from 'fastify'
import { AppInstance } from '../../app/app'
import postApiV1OrdersController from './controllers/post-api-v1-orders.controller'

export default (app: AppInstance) =>
  (fastify: FastifyInstance, opts: FastifyPluginOptions, done: HookHandlerDoneFunction) => {
    fastify.post('orders', postApiV1OrdersController(app))
    done()
  }
