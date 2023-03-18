import { option, taskEither } from 'fp-ts'
import { flow, pipe } from 'fp-ts/function'
import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import * as t from 'io-ts'
import { domain } from '../../../../../../src'
import { OrderRepository as IOrderRepository } from '../../../components/order/application/repositories/order.repository'
import { Order } from '../../../components/order/domain/entities/order'
import { MongoDbRepositoryAdapter } from './mongo-db.repository.adapter'

export class OrderRepositoryAdapter extends MongoDbRepositoryAdapter<Order> implements IOrderRepository {
  protected collectionName: string = 'orders'

  readManyById(ids: ReadonlyArray<domain.entity.IdOf<Order>>): TaskEither<Error, ReadonlyArray<Order>> {
    throw new Error('Method not implemented')
  }

  readOneById(id: domain.entity.IdOf<Order>): TaskEither<Error, Option<Order>> {
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
      taskEither.chainEitherKW(flow(t.union([t.null, Order.codec()]).decode)),
      taskEither.map(option.fromNullable),
      taskEither.map(x => x as any),
      taskEither.mapLeft(e => new Error(e as any)),
      taskEither.chainFirstW(() => this.close()),
    )
  }

  upsertMany(entities: ReadonlyArray<Order>): TaskEither<Error, ReadonlyArray<Order>> {
    throw new Error('Method not implemented')
  }

  upsertOne(entity: Order): TaskEither<Error, Order> {
    return pipe(
      entity,
      taskEither.of,
      taskEither.chainFirst(entity =>
        pipe(
          this.client,
          taskEither.chain(connection =>
            taskEither.tryCatch(
              () => Promise.resolve(),
              // connection
              //   .db()
              //   .collection(this.collectionName)
              //   .updateOne({ id: entity.id.toRaw() }, { $set: pipe(entity, OrderC.encode) }, { upsert: true }),
              e => new Error(`Unable to create order: ${JSON.stringify(e)}`),
            ),
          ),
        ),
      ),
      taskEither.chainFirst(() => this.close()),
    )
  }
}
