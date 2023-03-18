import { DateTime } from './date-time'

export class DeletedAt extends DateTime {
  readonly _type = 'deleted-at'

  static codec() {
    return super.codec()
  }
}
