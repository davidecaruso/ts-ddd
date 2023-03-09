import { EventEmitter } from 'events'
import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import pino from 'pino'
import { domain } from '../../../src'
import { OrderCreatedEvent } from '../src/components/order/domain/events/OrderCreatedEvent'
import { PinoLoggerAdapter } from '../src/infrastructure/logging/PinoLoggerAdapter'
import server from '../src/presentation/server'
import { bootstrap } from './app'

const logger = new PinoLoggerAdapter(pino({ level: 'debug' }))
const AppEventEmitter = new (class AppEventEmitter extends EventEmitter {})()

const app = bootstrap(
  {
    mongodbUri: 'mongodb://foobar',
    components: { order: { mongodbUri: 'mongodb://foobar' }, user: {} },
  },
  AppEventEmitter,
  logger,
)

app.eventPublisher.listen<OrderCreatedEvent>('order-created', async event => {
  logger.debug(
    `Event listened: ${JSON.stringify({
      id: event.id,
      type: event._type,
      ...(event instanceof domain.event.DomainEvent && {
        layer: 'domain',
        aggregateId: event._aggregateId,
        aggregateType: event._aggregateType,
      }),
    })}`,
  )

  const order = pipe(
    await app.orderRepository.readOneById(event._aggregateId)(),
    either.map(either.fromOption(Error)),
    either.flatten,
  )

  setTimeout(() => logger.info('Sending email to the customer... '), 2000)
  if (either.isRight(order)) {
    app.userRepository.readOneById(order.right.userId)
    // ...
  }
})

server(app)
