import { ObjectID } from 'bson'
import { InvalidObjectIdGivenError } from '../../error'
import { Id } from './Id'

export abstract class ObjectId extends Id {
  abstract readonly _type: string
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

  equals(that: ObjectId): boolean {
    return that.constructor === this.constructor && that.value.equals(this.value)
  }

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }
}
