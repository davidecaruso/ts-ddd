import { ObjectID } from 'bson'
import * as t from 'io-ts'
import { InvalidObjectIdGivenError } from '../../error'
import { Id } from './Id'

export abstract class ObjectId implements Id {
  abstract readonly _type: string
  private readonly value: ObjectID

  constructor(input?: string | ObjectID | ObjectId) {
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

  equals(that: ObjectId): boolean {
    return that.constructor === this.constructor && that.value.equals(this.value)
  }

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }

  static get codec() {
    return new t.Type(
      this.name ?? ObjectId.name,
      (u): u is typeof this => u instanceof this,
      (u, c) => {
        try {
          // @ts-ignore
          return t.success(new this(u as typeof this))
        } catch (error) {
          return t.failure(u, c)
        }
      },
      o => o.toString(),
    )
  }
}
