import { ObjectId, ObjectIdC } from '../../../../../../../src/domain/value-object'

export class UserId extends ObjectId {
  readonly _type = 'user-id'
}

export const UserIdC = ObjectIdC(UserId)
