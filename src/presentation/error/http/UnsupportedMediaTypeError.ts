import { ClientError } from './ClientError'

export class UnsupportedMediaTypeError extends ClientError {
  readonly _type = 'unsupported-media-type'
  readonly status = 415
}
