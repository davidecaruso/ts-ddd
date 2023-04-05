import { Id } from '../value-object'

export abstract class Entity<I extends Id = Id> {
  readonly _type?: string = undefined

  constructor(readonly id: I) {}

  equals(that: this): boolean {
    return that._type === this._type && that.id.equals(this.id)
  }
}

export type TypeOf<E extends Entity> = E['_type']

export type IdOf<E extends Entity> = E['id']
