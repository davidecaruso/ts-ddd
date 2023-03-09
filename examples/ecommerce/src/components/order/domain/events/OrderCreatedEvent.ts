import { domain } from '../../../../../../../src'
import { Order } from '../entities/Order'
import { EventId } from '../value-objects/EventId'
import { OrderId } from '../value-objects/OrderId'

export class OrderCreatedEvent extends domain.event.DomainEvent<EventId, Order> {
  readonly _type = 'order-created'

  constructor(readonly _aggregateId: OrderId, readonly id: EventId = new EventId()) {
    super(id, _aggregateId)
  }
}
