import { ClientError } from './ClientError'

export class ConflictError extends ClientError {
  readonly _type = 'Conflict'
  readonly status = 409
}
