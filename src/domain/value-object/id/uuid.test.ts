import { either } from 'fp-ts'
import { v4 } from 'uuid'
import { InvalidUuidGivenError } from '../../error'
import { IntegerId } from './integer-id'
import { Uuid } from './uuid'

class FooId extends Uuid {
  readonly _type = 'foo-id'

  static codec() {
    return super.codec()
  }
}

describe('Uuid', () => {
  describe('constructor', () => {
    describe('with uuid input argument', () => {
      it('should return an FooId instance', () => {
        const uuid = v4()
        const sut = new FooId(uuid)

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(uuid)
        expect(sut.toString()).toStrictEqual(uuid.toString())
      })
    })

    describe('with uuid as string input argument', () => {
      it('should return an FooId instance', () => {
        const uuid = 'b7089b55-58c6-44e0-8c8b-67dfbee4aef7'
        const sut = new FooId(uuid)

        expect(sut._type).toStrictEqual('foo-id')
        expect(sut.toRaw()).toStrictEqual(uuid)
        expect(sut.toString()).toStrictEqual(uuid)
      })
    })

    describe('with invalid input argument', () => {
      it('should throw an error', () => {
        expect(() => new FooId('foo')).toThrowError(new InvalidUuidGivenError('The value must be a valid Uuid'))
      })
    })
  })

  describe('equals', () => {
    describe('if FooId instances are equals', () => {
      it('should return true', () => {
        const uuid = v4()

        expect(new FooId(uuid).equals(new FooId(uuid))).toBeTruthy()
      })
    })

    describe('if FooId instances are not equals', () => {
      it('should return false', () => {
        expect(new FooId(v4()).equals(new FooId(v4()))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const uuid = v4()

        expect(FooId.codec().decode(uuid)).toStrictEqual(either.of(new FooId(uuid)))
        expect(FooId.codec().decode(uuid.toString())).toStrictEqual(either.of(new FooId(uuid)))
        expect(FooId.codec().decode(new FooId(uuid))).toStrictEqual(either.of(new FooId(uuid)))
        expect(FooId.codec().decode('foo')._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the string value', () => {
        const uuid = v4()

        expect(FooId.codec().encode(new FooId(uuid))).toStrictEqual(uuid.toString())
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        class BarId extends IntegerId {
          readonly _type = 'bar-id'
        }

        expect(FooId.codec().is(new FooId())).toBeTruthy()
        expect(FooId.codec().is(new BarId(42))).toBeFalsy()
      })
    })
  })
})
