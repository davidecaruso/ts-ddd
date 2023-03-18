import { ServerError } from './server-error'

export class ServiceUnavailableError extends ServerError {
  readonly _type = 'service-unavailable'
  readonly status = 503
}
