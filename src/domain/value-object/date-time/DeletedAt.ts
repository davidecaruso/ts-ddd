import { DateTime } from './DateTime'

export class DeletedAt extends DateTime {
  readonly _type = 'deleted-at'
}
