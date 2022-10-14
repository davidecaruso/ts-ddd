import { AggregateRoot, IdOf, TypeOf } from '../entity'
import { Id } from '../value-object'

export abstract class DomainEvent<A extends Id, B extends AggregateRoot<Id>, T = string> {
  abstract readonly _type: T
  readonly _aggregateType!: TypeOf<B>

  constructor(protected _id: A, readonly _aggregateId: IdOf<B>) {}

  equals(that: DomainEvent<A, B>) {
    return that.constructor === this.constructor && that._id.equals(this._id)
  }

  toJson() {
    const { _id, _aggregateId, ...props } = this

    return {
      ...props,
      _id: _id.toString(),
      _aggregateId: _aggregateId.toString(),
    }
  }
}
