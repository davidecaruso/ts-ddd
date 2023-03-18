import { domain } from '../../../../../../../src'

export class OrderId extends domain.valueObject.ObjectId {
  readonly _type = 'order-id'
}
