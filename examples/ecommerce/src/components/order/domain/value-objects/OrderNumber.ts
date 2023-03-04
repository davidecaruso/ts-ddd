import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { ValueObject } from '../../../../../../../src/domain/value-object'

export class OrderNumber implements ValueObject {
  private readonly _value: string
  readonly _type = 'order-number'

  constructor(input: string | OrderNumber) {
    this._value = input instanceof OrderNumber ? input.value : input
  }

  get value() {
    return this._value
  }

  static create() {
    return new OrderNumber(`${(new Date().getTime() + '').slice(0, 10)}-${Math.random().toString(36).substring(2, 8)}`)
  }
}

export const OrderNumberC = new t.Type(
  OrderNumber.constructor.name,
  (u): u is OrderNumber => u instanceof OrderNumber,
  (u, c) =>
    u instanceof OrderNumber
      ? t.success(u)
      : pipe(
          NonEmptyString.validate(u, c),
          either.map(v => new OrderNumber(v)),
        ),
  o => o.toString(),
)
