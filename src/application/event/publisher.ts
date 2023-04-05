import { AggregateRoot } from '../../domain/entity'
import { DomainEvent } from '../../domain/event'

export interface Publisher {
  publish<E extends DomainEvent<AggregateRoot>>(e: E | ReadonlyArray<E>): Promise<void>
}
