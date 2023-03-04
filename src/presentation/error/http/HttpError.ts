/**
 * @see https://www.rfc-editor.org/rfc/rfc7807
 * @see https://www.rfc-editor.org/rfc/rfc7231#section-6
 */
export abstract class HttpError extends Error {
  abstract readonly _type: string
  abstract readonly status: number

  constructor(
    readonly title: string,
    readonly detail?: string,
    readonly invalidParams?: ReadonlyArray<{
      readonly name: string
      readonly reason: string
    }>,
    readonly type?: string,
  ) {
    super(detail ? `${title}: ${detail}` : title)
  }

  toJson() {
    return {
      ...(this.type ? { type: this.type } : undefined),
      title: this.title,
      status: this.status,
      ...(this.detail ? { detail: this.detail } : undefined),
      ...(this.invalidParams && this.invalidParams.length > 0 ? { 'invalid-params': this.invalidParams } : undefined),
    }
  }
}

export type TypeOf<E extends HttpError> = E['_type']
