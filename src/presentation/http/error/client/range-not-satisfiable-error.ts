import { ClientError } from './client-error'

export class RangeNotSatisfiableError extends ClientError {
  readonly _type = 'range-not-satisfiable'
  readonly status = 416
}
