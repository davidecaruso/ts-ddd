import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { Command } from '../../../../../../../src/application/dto'
import { UserId } from '../../../user/domain/value-objects/UserId'
import { ProductId } from '../../domain/value-objects/ProductId'
import { ProductQuantity } from '../../domain/value-objects/ProductQuantity'

export interface PlaceOrderCommand extends Command {
  userId: UserId
  products: tt.ReadonlyNonEmptyArray<{
    id: ProductId
    quantity: ProductQuantity
  }>
}

export const PlaceOrderCommand = t.type(
  {
    userId: UserId.codec,
    products: tt.readonlyNonEmptyArray(
      t.type(
        {
          id: ProductId.codec,
          quantity: ProductQuantity.codec,
        },
        'PlaceOrderCommand<Product>',
      ),
    ),
  },
  'PlaceOrderCommand',
)
