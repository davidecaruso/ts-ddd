import { either } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { ValueObject } from './ValueObject'

export abstract class DateTime extends ValueObject {
  private readonly _value: Date

  get value() {
    return this._value
  }

  constructor(input: string | Date | DateTime = new Date()) {
    super()
    this._value =
      input instanceof DateTime ? new Date(input.toString()) : input instanceof Date ? input : new Date(input)
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

export const DateTimeFromCtorC = <A extends DateTime>(ctor: new (input: string | Date | DateTime) => A) =>
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

// export const DateTimeFromCtorM =
//   <A extends DateTime>(Ctor: new (input: Input) => A) =>
//   (endDate: Date = new Date()): Mock<A> =>
//     pipe(
//       $mock.integer(0, endDate.getTime()),
//       $mock.map(n => new Date(n)),
//       $mock.map(date => new Ctor(date)),
//     )
