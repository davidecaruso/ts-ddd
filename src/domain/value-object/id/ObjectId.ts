import { ObjectID } from 'bson'
import * as t from 'io-ts'
import { InvalidObjectIdGivenError } from '../../error'
import { Id } from './Id'

export abstract class ObjectId extends Id {
  private readonly value: ObjectID

  constructor(input?: string | ObjectID | ObjectId) {
    super()
    try {
      this.value = input
        ? input instanceof ObjectID
          ? input
          : input instanceof ObjectId
          ? input.value
          : new ObjectID(input)
        : new ObjectID()
    } catch (e) {
      throw new InvalidObjectIdGivenError('The value must be a valid ObjectID')
    }
  }

  equals(that: Id): boolean {
    return that instanceof ObjectId && that.constructor === this.constructor && that.value.equals(this.value)
  }

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }
}

export const ObjectIdC = <A extends ObjectId>(ctor: new (input?: string | ObjectID | ObjectId) => A) =>
  new t.Type(
    ctor.name ?? ObjectId.name,
    (u): u is A => u instanceof ctor,
    (u, c) => {
      try {
        return t.success(new ctor(u as any))
      } catch (error) {
        return t.failure(u, c)
      }
    },
    o => o.toString(),
  )
