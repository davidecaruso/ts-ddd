import * as t from 'io-ts'
import { ValueObject } from '../ValueObject'

export abstract class Id implements ValueObject {
  abstract readonly _type: string

  abstract equals(that: Id): boolean

  abstract toString(): string

  abstract toRaw(): unknown
}

export type IdC<I extends Id> = t.Type<I, string>
