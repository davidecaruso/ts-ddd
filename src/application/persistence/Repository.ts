import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import { AggregateRoot, IdOf, TypeOf } from '../../domain/entity'
import { Id } from '../../domain/value-object'

export abstract class Repository<A extends AggregateRoot<Id>> {
  readonly _aggregateType!: TypeOf<A>

  abstract readManyById(ids: ReadonlyArray<IdOf<A>>): TaskEither<Error, ReadonlyArray<A>>

  abstract readOneById(id: IdOf<A>): TaskEither<Error, Option<A>>

  abstract upsertMany(aggregates: ReadonlyArray<A>): TaskEither<Error, void>

  abstract upsertOne(aggregate: A): TaskEither<Error, void>
}

export type AggregateOf<A extends AggregateRoot<Id>, R extends Repository<A>> = TypeOf<A>
