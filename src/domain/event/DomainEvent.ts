import { AggregateRoot, IdOf, TypeOf as TypeOfAggregate } from '../entity'
import { Id } from '../value-object'

export abstract class DomainEvent<I extends Id, A extends AggregateRoot<Id>> {
  abstract readonly _type: string
  readonly _aggregateType!: TypeOfAggregate<A>

  constructor(readonly id: I, readonly _aggregateId: IdOf<A>) {}
}

export type TypeOf<E extends DomainEvent<Id, AggregateRoot<Id>>> = E['_type']
