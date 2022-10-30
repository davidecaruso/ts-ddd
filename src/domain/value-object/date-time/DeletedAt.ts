import { DateTime, DateTimeFromCtorC } from './DateTime'

export class DeletedAt extends DateTime {}

export const DeletedAtC = DateTimeFromCtorC(DeletedAt)
