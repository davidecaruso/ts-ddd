import * as t from 'io-ts'
import { Id, IdC } from '../value-object'

export abstract class Entity<A extends Id, T = string> {
  abstract readonly _type: T

  constructor(readonly _id: A) {}

  equals(that: Entity<A>): boolean {
    return that.constructor === this.constructor && that._id.equals(this._id)
  }
}

export const EntityC = <A extends string, B extends Id>(type: A, idC: IdC<B>) =>
  t.type({
    _type: t.literal(type),
    _id: idC,
  })

export type TypeOf<A extends Entity<Id>> = A['_type']

export type IdOf<A extends Entity<Id>> = A['_id']
