import { domain } from '../../../../../../../src'

export class UserId extends domain.valueObject.ObjectId {
  readonly _type = 'user-id'

  static codec() {
    return super.codec()
  }
}
