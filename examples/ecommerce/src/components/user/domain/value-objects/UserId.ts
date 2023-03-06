import { ObjectId } from '../../../../../../../src/domain/value-object'

export class UserId extends ObjectId {
  readonly _type = 'user-id'
}
