import * as t from 'io-ts'
import { Id, IdC } from '../value-object'

export abstract class Entity<A extends Id, T = string> {
  abstract readonly _type: T

  constructor(readonly id: A) {}

  equals(that: Entity<A>): boolean {
    return that.constructor === this.constructor && that.id.equals(this.id)
  }
}

export const EntityC = <A extends string, B extends Id>(type: A, idC: IdC<B>) =>
  t.type({
    _type: t.literal(type),
    id: idC,
  })

export type TypeOf<A extends Entity<Id>> = A['_type']

export type IdOf<A extends Entity<Id>> = A['id']
