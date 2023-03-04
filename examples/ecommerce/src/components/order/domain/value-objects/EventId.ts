import { ObjectId } from '../../../../../../../src/domain/value-object'

export class EventId extends ObjectId {
  readonly _type = 'event-id'
}
