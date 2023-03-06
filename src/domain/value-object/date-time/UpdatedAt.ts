import { CreatedAt } from './CreatedAt'
import { DateTime, DateTimeFromCtorC } from './DateTime'

export class UpdatedAt extends DateTime {
  readonly _type = 'updated-at'

  static fromCreatedAt(createdAt: CreatedAt): UpdatedAt {
    return new UpdatedAt(createdAt)
  }
}

export const UpdatedAtC = DateTimeFromCtorC(UpdatedAt)
