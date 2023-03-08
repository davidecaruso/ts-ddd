import { Id } from '../value-object'

export abstract class Entity<I extends Id> {
  abstract readonly _type: string

  constructor(readonly id: I) {}

  equals(that: this): boolean {
    return that._type === this._type && that.id.equals(this.id)
  }
}

export type TypeOf<E extends Entity<Id>> = E['_type']

export type IdOf<E extends Entity<Id>> = E['id']
