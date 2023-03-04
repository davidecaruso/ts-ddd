import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class OrderId extends ObjectId {
  readonly _type = 'order-id'
}

export const OrderIdC = ObjectIdC(OrderId)
