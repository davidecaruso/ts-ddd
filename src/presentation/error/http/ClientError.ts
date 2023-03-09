import { HttpError } from './HttpError'

/**
 * @see https://github.com/Microsoft/TypeScript-wiki/blob/main/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
 */
export abstract class ClientError extends HttpError {
  constructor(
    readonly title: string,
    readonly detail?: string,
    readonly invalidParams?: ReadonlyArray<{
      readonly name: string
      readonly reason: string
    }>,
    readonly type?: string,
  ) {
    super(title, detail, invalidParams, type)

    Object.setPrototypeOf(this, ClientError.prototype)
  }
}
