import { DateTime } from './date-time'

export class OccurredAt extends DateTime {
  readonly _type = 'occurred-at'

  static codec() {
    return super.codec()
  }
}
