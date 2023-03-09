import { option, readonlyArray, readonlyNonEmptyArray } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { identity } from 'io-ts'
import { ReadonlyNonEmptyArray } from 'io-ts-types'
import { domain } from '../../../../../../../src'
import { User } from '../../../user/domain/entities/User'
import { UserId } from '../../../user/domain/value-objects/UserId'
import { EmptyOrderError } from '../errors/EmptyOrderError'
import { InvalidProductQuantityGivenError } from '../errors/InvalidProductQuantityGivenError'
import { OrderCreatedEvent } from '../events/OrderCreatedEvent'
import { OrderId } from '../value-objects/OrderId'
import { OrderNumber } from '../value-objects/OrderNumber'
import { OrderTotal } from '../value-objects/OrderTotal'
import { ProductId } from '../value-objects/ProductId'
import { ProductPrice } from '../value-objects/ProductPrice'
import { ProductQuantity } from '../value-objects/ProductQuantity'
import { Product } from './Product'

export class Order extends domain.entity.AggregateRoot<OrderId> {
  readonly _type = 'order'
  readonly updatedAt: domain.valueObject.UpdatedAt

  get total(): OrderTotal {
    return pipe(
      this.products,
      readonlyNonEmptyArray.reduce(0, (total, { id, price, quantity }) => price.value * quantity.value),
      total => new OrderTotal(total),
    )
  }

  protected constructor(
    readonly code: OrderNumber,
    readonly products: ReadonlyNonEmptyArray<{ id: ProductId; price: ProductPrice; quantity: ProductQuantity }>,
    readonly userId: UserId,
    readonly id: OrderId = new OrderId(),
    readonly createdAt: domain.valueObject.CreatedAt = new domain.valueObject.CreatedAt(),
    updatedAt?: domain.valueObject.UpdatedAt,
  ) {
    super(id)

    this.updatedAt = updatedAt ?? domain.valueObject.UpdatedAt.fromCreatedAt(createdAt)
  }

  static create(products: ReadonlyNonEmptyArray<[Product, ProductQuantity]>, user: User): Order {
    pipe(
      [...products],
      readonlyArray.findFirst(([_, quantity]) => quantity.value === 0),
      option.map(([product]) => {
        throw new InvalidProductQuantityGivenError(
          'Please, select at least one item for product "' + product.name.value + '"',
        )
      }),
    )

    const order = new Order(
      OrderNumber.create(),
      pipe(
        products.map(([{ id, price }, quantity]) => ({
          id,
          price,
          quantity,
        })),
        readonlyNonEmptyArray.fromArray,
        option.match(() => {
          throw new EmptyOrderError('You should add at least one product')
        }, identity),
      ),
      user.id,
    )

    order.raise(new OrderCreatedEvent(order.id))

    return order
  }

  static codec() {
    return t.type({})
  }
}
