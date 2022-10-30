import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import { Entity, IdOf, TypeOf } from '../../domain/entity'
import { Id } from '../../domain/value-object'
import { Logger } from '../logging'

export abstract class Repository<E extends Entity<Id>> {
  constructor(protected logger?: Logger) {}

  abstract readManyById(ids: ReadonlyArray<IdOf<E>>): TaskEither<Error, ReadonlyArray<E>>

  abstract readOneById(id: IdOf<E>): TaskEither<Error, Option<E>>

  abstract upsertMany(entities: ReadonlyArray<E>): TaskEither<Error, ReadonlyArray<E>>

  abstract upsertOne(entity: E): TaskEither<Error, E>
}

export type EntityOf<E extends Entity<Id>, R extends Repository<E>> = TypeOf<E>
