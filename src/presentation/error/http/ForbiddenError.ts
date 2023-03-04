import { ClientError } from './ClientError'

export class ForbiddenError extends ClientError {
  readonly _type = 'forbidden'
  readonly status = 403
}
