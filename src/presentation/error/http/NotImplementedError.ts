import { ServerError } from './ServerError'

export class NotImplementedError extends ServerError {
  readonly _type = 'not-implemented'
  readonly status = 501
}
