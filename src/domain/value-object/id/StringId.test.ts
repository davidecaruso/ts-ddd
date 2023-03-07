import { either } from 'fp-ts'
import { InvalidStringIdGivenError } from '../../error'
import { IntegerId } from './IntegerId'
import { StringId } from './StringId'

class FooId extends StringId {
  readonly _type = 'foo-id'

  static codec() {
    return super.codec(this)
  }
}

describe('StringId', () => {
  describe('constructor', () => {
    describe('with valid input argument', () => {
      it('should return an FooId instance', () => {
        const sut = new FooId('foo')

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual('foo')
        expect(sut.toString()).toStrictEqual('foo')
      })
    })

    describe('with invalid input argument', () => {
      it('should throw an error', () => {
        expect(() => new FooId('')).toThrowError(new InvalidStringIdGivenError('The value must be a non-empty string'))
      })
    })
  })

  describe('equals', () => {
    describe('if FooId instances are equals', () => {
      it('should return true', () => {
        expect(new FooId('foo').equals(new FooId('foo'))).toBeTruthy()
      })
    })

    describe('if FooId instances are not equals', () => {
      it('should return false', () => {
        expect(new FooId('foo').equals(new FooId('bar'))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        expect(FooId.codec().decode('foo')).toStrictEqual(either.of(new FooId('foo')))
        expect(FooId.codec().decode('foo')).toStrictEqual(either.of(new FooId('foo')))
        expect(FooId.codec().decode(new FooId('foo'))).toStrictEqual(either.of(new FooId('foo')))
        expect(FooId.codec().decode('')._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the string value', () => {
        expect(FooId.codec().encode(new FooId('foo'))).toStrictEqual('foo')
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        class BarId extends IntegerId {
          readonly _type = 'bar-id'
        }

        expect(FooId.codec().is(new FooId('foo'))).toBeTruthy()
        expect(FooId.codec().is(new BarId(42))).toBeFalsy()
      })
    })
  })
})
