import { DateTime, DateTimeFromCtorC } from './DateTime'

export class OccurredAt extends DateTime {
  readonly _type = 'occurred-at'
}

export const type = DateTimeFromCtorC(OccurredAt)
