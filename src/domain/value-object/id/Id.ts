import { ValueObject } from '../ValueObject'

export interface Id extends ValueObject {
  readonly _type: string

  equals(that: this): boolean

  toString(): string

  toRaw(): unknown
}
