import { IntegerId } from '../value-object'
import { Entity } from './Entity'

class FooId extends IntegerId {
  readonly _type = 'foo-id'
}

class Foo extends Entity<FooId> {
  readonly _type = 'foo'
}

describe('Entity', () => {
  describe('constructor', () => {
    it('should return a Foo instance', () => {
      const id = new FooId(42)
      const sut = new Foo(id)

      expect(sut._type).toStrictEqual('foo')
      expect(sut.id._type).toStrictEqual('foo-id')
      expect(sut.id).toStrictEqual(id)
      expect(sut.id.toRaw()).toStrictEqual(42)
      expect(sut.id.toString()).toStrictEqual('42')
    })
  })

  describe('equals', () => {
    describe('if Foo instances are equals', () => {
      it('should return true', () => {
        const id = new FooId(42)
        const instance1 = new Foo(id)
        const instance2 = new Foo(id)

        expect(instance1.equals(instance2)).toBeTruthy()
      })
    })

    describe('if Foo instances are not equals', () => {
      it('should return true', () => {
        const id = new FooId(42)
        const instance1 = new Foo(id)
        const instance2 = new Foo(new FooId(84))

        expect(instance1.equals(instance2)).toBeFalsy()
      })
    })
  })
})
