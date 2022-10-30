import { option, readonlyArray, readonlyNonEmptyArray } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import { ReadonlyNonEmptyArray } from 'io-ts-types'
import { AggregateRoot } from '../../../../../../../src/domain/entity'
import { CreatedAt, ObjectId, UpdatedAt } from '../../../../../../../src/domain/value-object'
import { InvalidProductQuantityGivenError } from '../errors/InvalidProductQuantityGivenError'
import { OrderCreatedEvent } from '../events/OrderCreatedEvent'
import { OrderId } from '../value-objects/OrderId'
import { OrderNumber } from '../value-objects/OrderNumber'
import { OrderTotal } from '../value-objects/OrderTotal'
import { ProductQuantity } from '../value-objects/ProductQuantity'
import { Product } from './Product'
import { User } from './User'
import * as t from 'io-ts'

export class Order extends AggregateRoot<ObjectId> {
  readonly _type: string = 'order'
  readonly updatedAt: UpdatedAt
  protected _user!: User

  constructor(
    readonly code: OrderNumber,
    readonly products: ReadonlyNonEmptyArray<[Product, ProductQuantity]>,
    readonly id: OrderId = new OrderId(),
    readonly createdAt: CreatedAt = new CreatedAt(),
    updatedAt?: UpdatedAt,
  ) {
    super(id)

    pipe(
      [...this.products],
      readonlyArray.findFirst(([_, quantity]) => quantity.value === 0),
      option.map(([product]) => {
        throw new InvalidProductQuantityGivenError(
          'Please, select at least one item for product "' + product.name.value + '"',
        )
      }),
    )

    this.updatedAt = updatedAt ?? UpdatedAt.fromCreatedAt(createdAt)
  }

  get user() {
    return this._user
  }

  get total(): OrderTotal {
    return pipe(
      this.products,
      readonlyNonEmptyArray.reduce(new OrderTotal(0), (total, [product, quantity]) =>
        total.add(product.price.value * quantity.value),
      ),
    )
  }

  static create(products: ReadonlyNonEmptyArray<[Product, ProductQuantity]>, user: User): Order {
    const order = new Order(OrderNumber.create(), products)

    order._user = user
    order.emit(new OrderCreatedEvent(order.id))

    return order
  }
}

export const OrderC = t.type({})
