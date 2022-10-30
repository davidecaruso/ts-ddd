import { taskEither } from 'fp-ts'
import { constVoid, pipe } from 'fp-ts/function'
import { Option } from 'fp-ts/Option'
import { TaskEither } from 'fp-ts/TaskEither'
import { IdOf } from '../../../../../../src/domain/entity'
import { OrderRepository as IOrderRepository } from '../../../components/order/application/repositories/OrderRepository'
import { Order, OrderC } from '../../../components/order/domain/entities/Order'
import { MongoDbRepositoryAdapter } from './MongoDbRepositoryAdapter'

export class OrderRepository extends MongoDbRepositoryAdapter<Order> implements IOrderRepository {
  protected collectionName: string = 'orders'

  readManyById(ids: ReadonlyArray<IdOf<Order>>): TaskEither<Error, ReadonlyArray<Order>> {
    throw new Error('Method not implemented')
  }

  readOneById(id: IdOf<Order>): TaskEither<Error, Option<Order>> {
    throw new Error('Method not implemented')
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
