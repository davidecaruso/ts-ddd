import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { Command } from '../../../../../../../src/application/dto'
import { UserId, UserIdC } from '../../../user/domain/value-objects/UserId'
import { ProductId, ProductIdC } from '../../domain/value-objects/ProductId'
import { ProductQuantity, ProductQuantityC } from '../../domain/value-objects/ProductQuantity'

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
