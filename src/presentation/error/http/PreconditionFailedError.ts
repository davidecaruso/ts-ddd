import { ClientError } from './ClientError'

export class PreconditionFailedError extends ClientError {
  readonly _type = 'precondition-failed'
  readonly status = 412
}
