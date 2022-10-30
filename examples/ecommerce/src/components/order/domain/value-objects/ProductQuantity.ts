import { UnsignedInteger, UnsignedIntegerC } from '../../../../../../../src/domain/value-object'

export class ProductQuantity extends UnsignedInteger {}

export const ProductQuantityC = UnsignedIntegerC(ProductQuantity)
