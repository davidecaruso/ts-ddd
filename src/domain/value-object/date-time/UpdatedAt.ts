import { CreatedAt } from './CreatedAt'
import { DateTime, DateTimeFromCtorC } from './DateTime'

export class UpdatedAt extends DateTime {
  static fromCreatedAt(createdAt: CreatedAt): UpdatedAt {
    return new UpdatedAt(createdAt)
  }
}

export const UpdatedAtC = DateTimeFromCtorC(UpdatedAt)
