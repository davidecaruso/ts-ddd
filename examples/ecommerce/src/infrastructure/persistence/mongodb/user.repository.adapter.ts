import { option, taskEither } from 'fp-ts'
import { flow, pipe } from 'fp-ts/function'
import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { domain } from '../../../../../../src'
import { UserRepository as IUserRepository } from '../../../components/user/application/repositories/user.repository'
import { User } from '../../../components/user/domain/entities/user'
import { MongoDbRepositoryAdapter } from './mongo-db.repository.adapter'

export class UserRepositoryAdapter extends MongoDbRepositoryAdapter<User> implements IUserRepository {
  protected collectionName: string = 'users'

  readManyById(ids: ReadonlyArray<domain.entity.IdOf<User>>): TaskEither<Error, ReadonlyArray<User>> {
    throw new Error('Method not implemented')
  }

  readOneById(id: domain.entity.IdOf<User>): TaskEither<Error, Option<User>> {
    return pipe(
      id,
      taskEither.of,
      taskEither.chainFirst(id =>
        pipe(
          this.client,
          taskEither.chain(connection =>
            taskEither.tryCatch(
              async () => await Promise.resolve({}),
              // connection.db().collection(this.collectionName).findOne({ _id: id.toRaw() }),
              e => new Error(`Unable to read user: ${JSON.stringify(e)}`),
            ),
          ),
        ),
      ),
      taskEither.chainEitherKW(flow(t.union([t.null, User.codec]).decode)),
      taskEither.map(option.fromNullable),
      taskEither.map(x => x as any),
      taskEither.mapLeft(e => new Error(e as any)),
      taskEither.chainFirstW(() => this.close()),
    )
  }

  upsertMany(entities: ReadonlyArray<User>): TaskEither<Error, ReadonlyArray<User>> {
    throw new Error('Method not implemented')
  }

  upsertOne(entity: User): TaskEither<Error, User> {
    throw new Error('Method not implemented')
  }
}
