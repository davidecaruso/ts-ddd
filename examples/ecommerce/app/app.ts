import { EventEmitter } from 'events'
import { Logger } from '../../../src/application/logging'
import { EventEmitterListenerPublisherAdapter } from '../src/infrastructure/messaging/event-emitter.listener-publisher.adapter'
import { OrderRepositoryAdapter } from '../src/infrastructure/persistence/mongodb/order.repository.adapter'
import { ProductRepositoryAdapter } from '../src/infrastructure/persistence/mongodb/product.repository.adapter'
import { UserRepositoryAdapter } from '../src/infrastructure/persistence/mongodb/user.repository.adapter'

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
  eventPublisher: new EventEmitterListenerPublisherAdapter(eventEmitter, logger),
  orderRepository: new OrderRepositoryAdapter(env.components.order.mongodbUri, logger),
  userRepository: new UserRepositoryAdapter(env.mongodbUri, logger),
  productRepository: new ProductRepositoryAdapter(env.components.order.mongodbUri, logger),
})

export type AppInstance = ReturnType<typeof bootstrap>
