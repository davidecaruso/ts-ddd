import { ServerError } from './ServerError'

export class InternalServerError extends ServerError {
  readonly _type = 'internal-server-error'
  readonly status = 500
}
