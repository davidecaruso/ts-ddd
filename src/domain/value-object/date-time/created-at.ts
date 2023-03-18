import { DateTime } from './date-time'

export class CreatedAt extends DateTime {
  readonly _type = 'created-at'

  static codec() {
    return super.codec()
  }
}
