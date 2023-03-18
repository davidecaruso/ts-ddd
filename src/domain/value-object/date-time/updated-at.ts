import { CreatedAt } from './created-at'
import { DateTime } from './date-time'

export class UpdatedAt extends DateTime {
  readonly _type = 'updated-at'

  static codec() {
    return super.codec()
  }

  static fromCreatedAt(createdAt: CreatedAt): UpdatedAt {
    return new UpdatedAt(createdAt)
  }
}
