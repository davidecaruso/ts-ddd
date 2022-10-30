import { Command } from '../../../../../../../src/application/dto'
import { ProductId, ProductIdC } from '../../domain/value-objects/ProductId'
import { ProductQuantity, ProductQuantityC } from '../../domain/value-objects/ProductQuantity'
import { UserId, UserIdC } from '../../domain/value-objects/UserId'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'

export interface PlaceOrderCommand extends Command {
  userId: UserId
  products: tt.ReadonlyNonEmptyArray<{
    id: ProductId
    quantity: ProductQuantity
  }>
}

export const PlaceOrderCommandC = t.type(
  {
    userId: UserIdC,
    products: tt.readonlyNonEmptyArray(
      t.type(
        {
          id: ProductIdC,
          quantity: ProductQuantityC,
        },
        'PlaceOrderCommand<Product>',
      ),
    ),
  },
  'PlaceOrderCommand',
)
