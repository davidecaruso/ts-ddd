import { DateTime } from './DateTime'

export class CreatedAt extends DateTime {
  readonly _type = 'created-at'

  static codec() {
    return super.codec(this)
  }
}
