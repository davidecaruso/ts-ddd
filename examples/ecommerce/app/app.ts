import { EventEmitter } from 'events'
import { Logger } from '../../../src/application/logging'
import { InMemoryEventEmitterAdapter } from '../src/infrastructure/messaging/InMemoryEventEmitterAdapter'
import { OrderRepository } from '../src/infrastructure/persistence/mongodb/OrderRepository'
import { ProductRepository } from '../src/infrastructure/persistence/mongodb/ProductRepository'
import { UserRepository } from '../src/infrastructure/persistence/mongodb/UserRepository'

export const bootstrap = (
  env: {
    mongodbUri: string
    components: {
      order: {
        mongodbUri: string
      }
      user: {}
    }
  },
  eventEmitter: EventEmitter,
  logger: Logger,
) => ({
  logger,
  eventPublisher: new InMemoryEventEmitterAdapter(eventEmitter, logger),
  orderRepository: new OrderRepository(env.components.order.mongodbUri, logger),
  userRepository: new UserRepository(env.mongodbUri, logger),
  productRepository: new ProductRepository(env.components.order.mongodbUri, logger),
})

export type AppInstance = ReturnType<typeof bootstrap>
