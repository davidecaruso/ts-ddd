import { AggregateRoot } from '../../domain/entity'
import { DomainEvent } from '../../domain/event'
import { Id } from '../../domain/value-object'

export interface Publisher {
  publish<E extends DomainEvent<Id, AggregateRoot<Id>>>(e: E | ReadonlyArray<E>): Promise<void>
}
