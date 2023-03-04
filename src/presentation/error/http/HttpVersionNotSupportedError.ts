import { ServerError } from './ServerError'

export class HttpVersionNotSupportedError extends ServerError {
  readonly _type = 'http-version-not-supported'
  readonly status = 505
}
