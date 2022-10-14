import { DomainEvent } from '../event'
import { Id } from '../value-object'
import { Entity } from './index'

export abstract class AggregateRoot<A extends Id> extends Entity<A> {
  private readonly _events: Array<DomainEvent<Id, this>> = []

  get events(): ReadonlyArray<DomainEvent<Id, this>> {
    return this._events
  }

  private emit(event: DomainEvent<Id, this>): void {
    this._events.push(event)
  }
}
