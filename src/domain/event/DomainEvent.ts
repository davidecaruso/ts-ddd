import { AggregateRoot, IdOf, TypeOf } from '../entity'
import { Id } from '../value-object'
import { Event } from './Event'

export abstract class DomainEvent<A extends Id, B extends AggregateRoot<Id>> extends Event<A> {
  readonly _aggregateType!: TypeOf<B>

  constructor(readonly id: A, readonly _aggregateId: IdOf<B>) {
    super(id)
  }

  toJson() {
    const { id, _aggregateId, ...props } = this

    return {
      ...props,
      id: id.toString(),
      _aggregateId: _aggregateId.toString(),
    }
  }
}
