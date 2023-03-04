import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { ValueObject } from '../../../../../../../src/domain/value-object'

export class ProductName implements ValueObject {
  private readonly _value: string
  readonly _type!: string

  constructor(input: string | ProductName) {
    this._value = input instanceof ProductName ? input.value : input
  }

  get value() {
    return this._value
  }
}

export const ProductNameC = new t.Type(
  ProductName.constructor.name,
  (u): u is ProductName => u instanceof ProductName,
  (u, c) =>
    u instanceof ProductName
      ? t.success(u)
      : pipe(
          NonEmptyString.validate(u, c),
          either.map(v => new ProductName(v)),
        ),
  o => o.toString(),
)
