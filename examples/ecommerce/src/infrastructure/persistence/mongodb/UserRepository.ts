import { option, taskEither } from 'fp-ts'
import { flow, pipe } from 'fp-ts/function'
import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { IdOf } from '../../../../../../src/domain/entity'
import { UserRepository as IUserRepository } from '../../../components/order/application/repositories/UserRepository'
import { User, UserC } from '../../../components/order/domain/entities/User'
import { MongoDbRepositoryAdapter } from './MongoDbRepositoryAdapter'

export class UserRepository extends MongoDbRepositoryAdapter<User> implements IUserRepository {
  protected collectionName: string = 'users'

  readManyById(ids: ReadonlyArray<IdOf<User>>): TaskEither<Error, ReadonlyArray<User>> {
    throw new Error('Method not implemented')
  }

  readOneById(id: IdOf<User>): TaskEither<Error, Option<User>> {
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
      taskEither.chainEitherKW(flow(t.union([t.null, UserC]).decode)),
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
