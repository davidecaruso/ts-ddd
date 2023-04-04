import { ServerError } from './server-error'

export class HttpVersionNotSupportedError extends ServerError {
  readonly _type = 'http-version-not-supported'
  readonly status = 505
}
