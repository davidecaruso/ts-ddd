import { DateTime, DateTimeFromCtorC } from './DateTime'

export class CreatedAt extends DateTime {
  readonly _type = 'created-at'
}

export const CreatedAtC = DateTimeFromCtorC(CreatedAt)
