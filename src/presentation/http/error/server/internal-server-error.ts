import { ServerError } from './server-error'

export class InternalServerError extends ServerError {
  readonly _type = 'internal-server-error'
  readonly status = 500
}
