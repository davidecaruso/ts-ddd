import { DomainEvent } from '../../../../../../../src/domain/event'
import { Order } from '../entities/Order'
import { EventId } from '../value-objects/EventId'
import { OrderId } from '../value-objects/OrderId'

export class OrderCreatedEvent extends DomainEvent<EventId, Order> {
  readonly _type: string = 'order-created'

  constructor(readonly _aggregateId: OrderId, readonly id: EventId = new EventId()) {
    super(id, _aggregateId)
  }
}
