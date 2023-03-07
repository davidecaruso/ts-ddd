import { ObjectID } from 'bson'
import { either } from 'fp-ts'
import { InvalidObjectIdGivenError } from '../../error'
import { IntegerId } from './IntegerId'
import { ObjectId } from './ObjectId'

class FooId extends ObjectId {
  readonly _type = 'foo-id'
}

describe('ObjectId', () => {
  describe('constructor', () => {
    describe('with object ID input argument', () => {
      it('should return an FooId instance', () => {
        const oid = new ObjectID()
        const sut = new FooId(oid)

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(oid)
        expect(sut.toString()).toStrictEqual(oid.toString())
      })
    })

    describe('with object ID as string input argument', () => {
      it('should return an FooId instance', () => {
        const oid = new ObjectID()
        const sut = new FooId(oid.toString())

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(oid)
        expect(sut.toString()).toStrictEqual(oid.toString())
      })
    })

    describe('with invalid input argument', () => {
      it('should throw an error', () => {
        expect(() => new FooId('foo')).toThrowError(new InvalidObjectIdGivenError('The value must be a valid ObjectID'))
      })
    })
  })

  describe('equals', () => {
    describe('if FooId instances are equals', () => {
      it('should return true', () => {
        const oid = new ObjectID()

        expect(new FooId(oid).equals(new FooId(oid))).toBeTruthy()
      })
    })

    describe('if FooId instances are not equals', () => {
      it('should return false', () => {
        expect(new FooId(new ObjectID()).equals(new FooId(new ObjectID()))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const oid = new ObjectID()

        expect(FooId.codec.decode(oid)).toStrictEqual(either.of(new FooId(oid)))
        expect(FooId.codec.decode(oid.toString())).toStrictEqual(either.of(new FooId(oid)))
        expect(FooId.codec.decode(new FooId(oid))).toStrictEqual(either.of(new FooId(oid)))
        expect(FooId.codec.decode('foo')._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the string value', () => {
        const oid = new ObjectID()

        expect(FooId.codec.encode(new FooId(oid))).toStrictEqual(oid.toString())
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        class BarId extends IntegerId {
          readonly _type = 'bar-id'
        }

        expect(FooId.codec.is(new FooId())).toBeTruthy()
        expect(FooId.codec.is(new BarId(42))).toBeFalsy()
      })
    })
  })
})
