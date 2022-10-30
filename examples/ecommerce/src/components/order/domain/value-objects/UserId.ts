import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class UserId extends ObjectId {}

export const UserIdC = ObjectIdC(UserId)
