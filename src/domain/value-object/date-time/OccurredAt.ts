import { DateTime, DateTimeFromCtorC } from './DateTime'

export class OccurredAt extends DateTime {}

export const type = DateTimeFromCtorC(OccurredAt)
