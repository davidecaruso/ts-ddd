import { AggregateRoot, IdOf, TypeOf as TypeOfAggregate } from '../entity'
import { Id, OccurredAt } from '../value-object'

export abstract class DomainEvent<A extends AggregateRoot, I extends Id = Id> {
  abstract readonly _type: string
  readonly _aggregateType!: TypeOfAggregate<A>

  constructor(readonly id: I, readonly _aggregateId: IdOf<A>, readonly occurredAt: OccurredAt = new OccurredAt()) {}
}

export type TypeOf<E extends DomainEvent<AggregateRoot>> = E['_type']
