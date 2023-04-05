import { DomainEvent } from '../event'
import { Id } from '../value-object'
import { Entity } from './entity'

export abstract class AggregateRoot<I extends Id = Id> extends Entity<I> {
  private readonly _events: Array<DomainEvent<this>> = []

  get events(): ReadonlyArray<DomainEvent<this>> {
    return this._events
  }

  protected raise(event: DomainEvent<this>): void {
    this._events.push(event)
  }
}
