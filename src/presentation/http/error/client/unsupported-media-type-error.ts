import { ClientError } from './client-error'

export class UnsupportedMediaTypeError extends ClientError {
  readonly _type = 'unsupported-media-type'
  readonly status = 415
}
