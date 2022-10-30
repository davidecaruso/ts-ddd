import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class OrderId extends ObjectId {}

export const OrderIdC = ObjectIdC(OrderId)
