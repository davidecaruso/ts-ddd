import * as t from 'io-ts'
import { DateTime, DateTimeFromCtorC } from './DateTime'

export class UpdatedAt extends DateTime {
  protected get codec(): t.Mixed {
    return DateTimeFromCtorC(UpdatedAt)
  }
}