import { AggregateRoot } from '../entity'
import { ObjectId, OccurredAt } from '../value-object'
import { DomainEvent } from './domain-event'

class FooId extends ObjectId {
  readonly _type = 'foo-id'
}

class Foo extends AggregateRoot<FooId> {
  readonly _type = 'foo'
}

class EventId extends ObjectId {
  readonly _type = 'event-id'
}

class FooCreated extends DomainEvent<Foo> {
  readonly _type = 'foo-created'
}

describe('DomainEvent', () => {
  describe('constructor', () => {
    describe('without the occurred at parameter', () => {
      it('should return a FooCreated instance with the current timestamp as occurred at', () => {
        const sut = new FooCreated(new EventId(), new FooId())

        expect(sut._type).toStrictEqual('foo-created')
        expect(sut.occurredAt.toString().substring(0, 13)).toStrictEqual(new Date().toISOString().substring(0, 13))
      })
    })

    describe('with the occurred at parameter', () => {
      it('should return a FooCreated instance', () => {
        const sut = new FooCreated(new EventId(), new FooId(), new OccurredAt(new Date(1979, 9, 12, 1)))

        expect(sut._type).toStrictEqual('foo-created')
        expect(sut.occurredAt.toDateString()).toStrictEqual('1979-10-12')
      })
    })
  })
})
