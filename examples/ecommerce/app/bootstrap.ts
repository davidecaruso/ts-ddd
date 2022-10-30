import { EventEmitter } from 'events'
import pino from 'pino'
import { PinoLoggerAdapter } from '../src/infrastructure/logging/PinoLoggerAdapter'
import { InMemoryEventEmitterAdapter } from '../src/infrastructure/messaging/InMemoryEventEmitterAdapter'
import { OrderRepository } from '../src/infrastructure/persistence/mongodb/OrderRepository'
import { ProductRepository } from '../src/infrastructure/persistence/mongodb/ProductRepository'
import { UserRepository } from '../src/infrastructure/persistence/mongodb/UserRepository'
import { Env } from './env'

export const AppEventEmitter = new (class AppEventEmitter extends EventEmitter {})()

const logger = new PinoLoggerAdapter(pino({ level: 'debug' }))

AppEventEmitter.on('order-created', () => {
  //  TODO: send email to customer
  logger.info('Sending email to the customer...')
})

export default (env: Env) => ({
  logger,
  eventPublisher: new InMemoryEventEmitterAdapter(AppEventEmitter, logger),
  orderRepository: new OrderRepository(env.components.order.mongodbUri, logger),
  userRepository: new UserRepository(env.components.order.mongodbUri, logger),
  productRepository: new ProductRepository(env.components.order.mongodbUri, logger),
})
