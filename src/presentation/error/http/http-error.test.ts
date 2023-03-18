import {
  BadGatewayError,
  BadRequestError,
  ClientError,
  ConflictError,
  ExpectationFailedError,
  ForbiddenError,
  GatewayTimeoutError,
  GoneError,
  HttpError,
  HttpVersionNotSupportedError,
  InternalServerError,
  LengthRequiredError,
  MethodNotAllowedError,
  NotAcceptableError,
  NotFoundError,
  NotImplementedError,
  PayloadTooLargeError,
  PaymentRequiredError,
  PreconditionFailedError,
  ProxyAuthenticationRequiredError,
  RangeNotSatisfiableError,
  RequestTimeoutError,
  ServerError,
  ServiceUnavailableError,
  UnauthorizedError,
  UnsupportedMediaTypeError,
  UpgradeRequiredError,
  UriTooLongError,
} from '../'

describe('HttpError', () => {
  describe('ClientError', () => {
    describe('constructor', () => {
      it.each([
        { ctor: BadRequestError, status: 400 },
        { ctor: UnauthorizedError, status: 401 },
        { ctor: PaymentRequiredError, status: 402 },
        { ctor: ForbiddenError, status: 403 },
        { ctor: NotFoundError, status: 404 },
        { ctor: MethodNotAllowedError, status: 405 },
        { ctor: NotAcceptableError, status: 406 },
        { ctor: ProxyAuthenticationRequiredError, status: 407 },
        { ctor: RequestTimeoutError, status: 408 },
        { ctor: ConflictError, status: 409 },
        { ctor: GoneError, status: 410 },
        { ctor: LengthRequiredError, status: 411 },
        { ctor: PreconditionFailedError, status: 412 },
        { ctor: PayloadTooLargeError, status: 413 },
        { ctor: UriTooLongError, status: 414 },
        { ctor: UnsupportedMediaTypeError, status: 415 },
        { ctor: RangeNotSatisfiableError, status: 416 },
        { ctor: ExpectationFailedError, status: 417 },
        { ctor: UpgradeRequiredError, status: 426 },
      ])('should return the correct error type', ({ ctor, status }) => {
        const title = 'foo'
        const detail = Math.random() < 0.5 ? 'bar' : undefined
        const invalidParams = Math.random() < 0.5 ? [{ name: 'baz', reason: 'qux' }] : undefined
        const type = Math.random() < 0.5 ? 'quxxx' : undefined

        const sut = new ctor(title, detail, invalidParams, type)

        expect(sut instanceof HttpError).toBeTruthy()
        expect(sut instanceof ClientError).toBeTruthy()
        expect(sut instanceof ServerError).toBeFalsy()
        expect(sut.status).toStrictEqual(status)
        expect(sut.toJson()).toStrictEqual({
          ...(type ? { type: type } : undefined),
          title: title,
          status: status,
          ...(detail ? { detail: detail } : undefined),
          ...(invalidParams && invalidParams.length > 0 ? { 'invalid-params': invalidParams } : undefined),
        })
      })
    })
  })

  describe('ServerError', () => {
    describe('constructor', () => {
      it.each([
        { ctor: InternalServerError, status: 500 },
        { ctor: NotImplementedError, status: 501 },
        { ctor: BadGatewayError, status: 502 },
        { ctor: ServiceUnavailableError, status: 503 },
        { ctor: GatewayTimeoutError, status: 504 },
        { ctor: HttpVersionNotSupportedError, status: 505 },
      ])('should return the correct error type', ({ ctor, status }) => {
        const title = 'foo'
        const detail = Math.random() < 0.5 ? 'bar' : undefined
        const invalidParams = Math.random() < 0.5 ? [{ name: 'baz', reason: 'qux' }] : undefined
        const type = Math.random() < 0.5 ? 'quxxx' : undefined

        const sut = new ctor(title, detail, invalidParams, type)

        expect(sut instanceof HttpError).toBeTruthy()
        expect(sut instanceof ServerError).toBeTruthy()
        expect(sut instanceof ClientError).toBeFalsy()
        expect(sut.status).toStrictEqual(status)
        expect(sut.toJson()).toStrictEqual({
          ...(type ? { type: type } : undefined),
          title: title,
          status: status,
          ...(detail ? { detail: detail } : undefined),
          ...(invalidParams && invalidParams.length > 0 ? { 'invalid-params': invalidParams } : undefined),
        })
      })
    })
  })
})
