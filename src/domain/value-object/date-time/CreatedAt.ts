import { DateTime, DateTimeFromCtorC } from './DateTime'

export class CreatedAt extends DateTime {}

export const CreatedAtC = DateTimeFromCtorC(CreatedAt)
