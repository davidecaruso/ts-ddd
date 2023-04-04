import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import { application, domain } from '../../../../../../src'
import { IdOf } from '../../../../../../src/domain/entity'

export abstract class Repository<E extends domain.entity.Entity<domain.valueObject.Id>>
  implements application.repository.Repository<E>
{
  constructor(protected logger?: application.logging.Logger) {}

  abstract readManyById(ids: ReadonlyArray<IdOf<E>>): TaskEither<Error, ReadonlyArray<E>>

  abstract readOneById(id: IdOf<E>): TaskEither<Error, Option<E>>

  abstract upsertMany(entities: ReadonlyArray<E>): TaskEither<Error, ReadonlyArray<E>>

  abstract upsertOne(entity: E): TaskEither<Error, E>
}
