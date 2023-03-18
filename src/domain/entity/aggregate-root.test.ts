import { DomainEvent } from '../event'
import { ObjectId } from '../value-object'
import { AggregateRoot } from './aggregate-root'

class EventId extends ObjectId {
  readonly _type = 'event-id'
}

class FooCreated extends DomainEvent<EventId, Foo> {
  readonly _type = 'foo-created'
}

class FooDeleted extends DomainEvent<EventId, Foo> {
  readonly _type = 'foo-deleted'
}

class FooId extends ObjectId {
  readonly _type = 'foo-id'
}

class Foo extends AggregateRoot<FooId> {
  readonly _type = 'foo'

  static create() {
    const instance = new Foo(new FooId())

    instance.raise(new FooCreated(new EventId(), instance.id))

    return instance
  }

  delete() {
    this.raise(new FooDeleted(new EventId(), this.id))
  }
}

describe('AggregateRoot', () => {
  describe('constructor', () => {
    it('should return a Foo instance', () => {
      const id = new FooId()
      const sut = new Foo(id)

      expect(sut._type).toStrictEqual('foo')
      expect(sut.id._type).toStrictEqual('foo-id')
      expect(sut.id).toStrictEqual(id)
    })
  })

  describe('events', () => {
    describe('without elements', () => {
      it('should return an empty array', () => {
        const sut = new Foo(new FooId())

        expect(sut.events).toStrictEqual([])
      })
    })

    describe('with some elements', () => {
      it('should return an array with events in the correct order', () => {
        const sut = Foo.create()
        sut.delete()

        expect(sut.events.length).toStrictEqual(2)
        expect(sut.events[0]._type).toStrictEqual('foo-created')
        expect(sut.events[1]._type).toStrictEqual('foo-deleted')
      })
    })
  })

  describe('equals', () => {
    describe('if Foo instances are equals', () => {
      it('should return true', () => {
        const id = new FooId()
        const instance1 = new Foo(id)
        const instance2 = new Foo(id)

        expect(instance1.equals(instance2)).toBeTruthy()
      })
    })

    describe('if Foo instances are not equals', () => {
      it('should return true', () => {
        const id = new FooId()
        const instance1 = new Foo(id)
        const instance2 = new Foo(new FooId())

        expect(instance1.equals(instance2)).toBeFalsy()
      })
    })
  })
})
