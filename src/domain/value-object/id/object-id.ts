import { ObjectID } from 'bson'
import { InvalidObjectIdGivenError } from '../../error'
import { Id } from './id'

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

  toString(): string {
    return this.value.toString()
  }

  toRaw(): unknown {
    return this.value
  }
}
