import { ClientError } from './client-error'

export class PreconditionFailedError extends ClientError {
  readonly _type = 'precondition-failed'
  readonly status = 412
}
