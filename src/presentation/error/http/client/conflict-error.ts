import { ClientError } from './client-error'

export class ConflictError extends ClientError {
  readonly _type = 'Conflict'
  readonly status = 409
}
