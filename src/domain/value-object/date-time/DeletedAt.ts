import { DateTime, DateTimeFromCtorC } from './DateTime'

export class DeletedAt extends DateTime {
  readonly _type = 'deleted-at'
}

export const DeletedAtC = DateTimeFromCtorC(DeletedAt)
