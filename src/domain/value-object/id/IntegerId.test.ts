import { either } from 'fp-ts'
import { InvalidIntegerIdGivenError } from '../../error'
import { IntegerId } from './IntegerId'
import { ObjectId } from './ObjectId'

class FooId extends IntegerId {
  readonly _type = 'foo-id'

  static codec() {
    return super.codec(this)
  }
}

describe('IntegerId', () => {
  describe('constructor', () => {
    describe('with integer input argument', () => {
      it('should return an FooId instance', () => {
        const sut = new FooId(42)

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(42)
        expect(sut.toString()).toStrictEqual('42')
      })
    })

    describe('with integer-like string input argument', () => {
      it('should return an FooId instance', () => {
        const sut = new FooId('42')

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(42)
        expect(sut.toString()).toStrictEqual('42')
      })
    })

    describe('with invalid input argument', () => {
      it('should throw an error', () => {
        const error = new InvalidIntegerIdGivenError('The value must be an integer or an integer-like string')

        expect(() => new FooId(42.1)).toThrowError(error)
        expect(() => new FooId('foo')).toThrowError(error)
      })
    })
  })

  describe('equals', () => {
    describe('if FooId instances are equals', () => {
      it('should return true', () => {
        expect(new FooId(42).equals(new FooId(42))).toBeTruthy()
      })
    })

    describe('if FooId instances are not equals', () => {
      it('should return false', () => {
        expect(new FooId(42).equals(new FooId(84))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        expect(FooId.codec().decode(42)).toStrictEqual(either.of(new FooId(42)))
        expect(FooId.codec().decode('42')).toStrictEqual(either.of(new FooId(42)))
        expect(FooId.codec().decode(new FooId(42))).toStrictEqual(either.of(new FooId(42)))
        expect(FooId.codec().decode('foo')._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the string value', () => {
        expect(FooId.codec().encode(new FooId(42))).toStrictEqual(42)
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        class BarId extends ObjectId {
          readonly _type = 'bar-id'
        }

        expect(FooId.codec().is(new FooId(42))).toBeTruthy()
        expect(FooId.codec().is(new BarId())).toBeFalsy()
      })
    })
  })
})
