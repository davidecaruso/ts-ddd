import { DomainEvent } from '../event'
import { Id } from '../value-object'
import { Entity } from './index'

export abstract class AggregateRoot<I extends Id> implements Entity<I> {
  abstract readonly _type: string
  private readonly _events: Array<DomainEvent<Id, this>> = []

  constructor(readonly id: I) {}

  get events(): ReadonlyArray<DomainEvent<Id, this>> {
    return this._events
  }

  protected emit(event: DomainEvent<Id, this>): void {
    this._events.push(event)
  }
}
