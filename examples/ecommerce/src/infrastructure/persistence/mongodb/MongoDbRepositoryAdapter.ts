import { taskEither } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { TaskEither } from 'fp-ts/TaskEither'
import { MongoClient } from 'mongodb'
import { application, domain } from '../../../../../../src'

export abstract class MongoDbRepositoryAdapter<
  A extends domain.entity.Entity<domain.valueObject.Id>,
> extends application.persistence.Repository<A> {
  protected abstract collectionName: string

  private _client: MongoClient | undefined

  protected get client(): TaskEither<Error, MongoClient> {
    return this._client ? taskEither.of(this._client) : this.connect()
  }

  constructor(protected readonly connectionUri: string, protected logger?: application.logging.Logger) {
    super(logger)
  }

  protected close(): TaskEither<Error, void> {
    return pipe(
      this.client,
      taskEither.chain(client =>
        taskEither.tryCatch(
          async () => await Promise.resolve(),
          // await client.close(),
          e => new Error(`Unable to close connection with MongoDB: ${JSON.stringify(e)}`),
        ),
      ),
      taskEither.chainFirst(client => taskEither.of((this._client = undefined))),
    )
  }

  private connect(): TaskEither<Error, MongoClient> {
    return pipe(
      taskEither.tryCatch(
        async () => undefined as any,
        // await new MongoClient(this.connectionUri).connect(),
        e => new Error(`Unable to connect with MongoDB: ${JSON.stringify(e)}`),
      ),
      taskEither.chainFirst(client => taskEither.of((this._client = client))),
    )
  }
}
