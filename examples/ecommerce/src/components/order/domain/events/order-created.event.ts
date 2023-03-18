import { domain } from '../../../../../../../src'
import { Order } from '../entities/order'
import { EventId } from '../value-objects/event-id'
import { OrderId } from '../value-objects/order-id'

export class OrderCreatedEvent extends domain.event.DomainEvent<EventId, Order> {
  readonly _type = 'order-created'

  constructor(readonly _aggregateId: OrderId, readonly id: EventId = new EventId()) {
    super(id, _aggregateId)
  }
}
