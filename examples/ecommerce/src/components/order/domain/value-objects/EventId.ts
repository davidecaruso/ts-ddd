import { domain } from '../../../../../../../src'

export class EventId extends domain.valueObject.ObjectId {
  readonly _type = 'event-id'
}
