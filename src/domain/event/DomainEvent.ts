import { AggregateRoot, IdOf, TypeOf } from '../entity'
import { Id } from '../value-object'
import { Event } from './Event'

export abstract class DomainEvent<I extends Id, A extends AggregateRoot<Id>> extends Event<I> {
  readonly _aggregateType!: TypeOf<A>

  constructor(readonly id: I, readonly _aggregateId: IdOf<A>) {
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
