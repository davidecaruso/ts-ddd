import { ClientError } from './ClientError'

export class UriTooLongError extends ClientError {
  readonly _type = 'uri-too-long'
  readonly status = 414
}
