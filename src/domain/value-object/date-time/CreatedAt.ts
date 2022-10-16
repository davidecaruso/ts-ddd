import * as t from 'io-ts'
import { DateTime, DateTimeFromCtorC } from './DateTime'

export class CreatedAt extends DateTime {
  protected get codec(): t.Mixed {
    return DateTimeFromCtorC(CreatedAt)
  }
}
