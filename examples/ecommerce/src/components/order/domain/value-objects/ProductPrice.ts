import { UnsignedDecimal, UnsignedDecimalC } from '../../../../../../../src/domain/value-object'

export class ProductPrice extends UnsignedDecimal {}

export const ProductPriceC = UnsignedDecimalC(ProductPrice)
