import { ClientError } from './client-error'

export class ForbiddenError extends ClientError {
  readonly _type = 'forbidden'
  readonly status = 403
}
