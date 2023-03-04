import { AggregateRoot, IdOf, TypeOf } from '../entity'
import { Id } from '../value-object'

export abstract class DomainEvent<I extends Id, A extends AggregateRoot<Id>> {
  readonly _type!: string
  readonly _aggregateType!: TypeOf<A>

  constructor(readonly id: I, readonly _aggregateId: IdOf<A>) {}

  toJson() {
    const { id, _aggregateId, ...props } = this

    return {
      ...props,
      id: id.toString(),
      _aggregateId: _aggregateId.toString(),
    }
  }
}
