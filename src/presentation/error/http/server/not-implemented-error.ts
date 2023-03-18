import { ServerError } from './server-error'

export class NotImplementedError extends ServerError {
  readonly _type = 'not-implemented'
  readonly status = 501
}
