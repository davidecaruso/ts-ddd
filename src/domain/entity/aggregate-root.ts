import { DomainEvent } from '../event'
import { Id } from '../value-object'
import { Entity } from './entity'

export abstract class AggregateRoot<I extends Id> extends Entity<I> {
  private readonly _events: Array<DomainEvent<Id, this>> = []

  get events(): ReadonlyArray<DomainEvent<Id, this>> {
    return this._events
  }

  protected raise(event: DomainEvent<Id, this>): void {
    this._events.push(event)
  }
}
