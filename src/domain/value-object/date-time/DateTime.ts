import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { ValueObject } from '../index'

export abstract class DateTime implements ValueObject {
  protected readonly _value: Date
  readonly _type!: string

  constructor(input: string | Date | DateTime = new Date()) {
    this._value =
      input instanceof DateTime ? new Date(input.toString()) : input instanceof Date ? input : new Date(input)
  }

  get value() {
    return this._value
  }

  equals(that: DateTime): boolean {
    return that._value === this._value
  }

  toString(): string {
    return this._value.toISOString()
  }

  toDateString(): string {
    return this._value.toISOString().substring(0, 10)
  }
}

const codec = t.union([tt.date, tt.DateFromISOString])

export const DateTimeFromCtorC = <A extends DateTime>(ctor: new (input: string | Date | A) => A) =>
  new t.Type(
    ctor.name,
    (u): u is A => u instanceof ctor,
    (u, c) =>
      u instanceof ctor
        ? t.success(u)
        : pipe(
            codec.validate(u, c),
            either.map(d => new ctor(d)),
          ),
    o => o.value,
  )
