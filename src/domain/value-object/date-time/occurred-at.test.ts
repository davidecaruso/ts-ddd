import { either } from 'fp-ts'
import { OccurredAt, UpdatedAt } from '../index'

describe('OccurredAt', () => {
  describe('constructor', () => {
    describe('with CreatedAt instance', () => {
      it('should return a Foo instance', () => {
        const date = new Date(1979, 9, 12, 1)
        const sut = new OccurredAt(new OccurredAt(date))

        expect(sut._type).toStrictEqual('occurred-at')
        expect(sut.toDateString()).toStrictEqual(date.toISOString().substring(0, 10))
      })
    })

    describe('without input argument', () => {
      it('should return a OccurredAt instance within current date', () => {
        const sut = new OccurredAt()

        expect(sut._type).toStrictEqual('occurred-at')
        expect(sut.toDateString()).toStrictEqual(new Date().toISOString().substring(0, 10))
      })
    })

    describe('with input argument', () => {
      it('should return a OccurredAt instance', () => {
        const date = new Date(1979, 9, 12, 1)

        expect(new OccurredAt(date).toString()).toStrictEqual(date.toISOString())
        expect(new OccurredAt(date).value).toStrictEqual(date)
        expect(new OccurredAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new OccurredAt(date.toString()).value).toStrictEqual(date)
        expect(new OccurredAt(new OccurredAt(date)).toString()).toStrictEqual(date.toISOString())
        expect(new OccurredAt(new OccurredAt(date)).value).toStrictEqual(date)
      })
    })
  })

  describe('equals', () => {
    describe('if OccurredAt instances are equals', () => {
      it('should return true', () => {
        expect(new OccurredAt(new Date(1979, 9, 12, 1)).equals(new OccurredAt(new Date(1979, 9, 12, 1)))).toBeTruthy()
      })
    })

    describe('if OccurredAt instances are not equals', () => {
      it('should return false', () => {
        expect(new OccurredAt().equals(new OccurredAt(new Date(1979, 9, 12, 1)))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const date = new Date()

        expect(OccurredAt.codec().decode(date)).toStrictEqual(either.of(new OccurredAt(date)))
        expect(OccurredAt.codec().decode(date.toISOString())).toStrictEqual(either.of(new OccurredAt(date)))
        expect(OccurredAt.codec().decode(new OccurredAt(date))).toStrictEqual(either.of(new OccurredAt(date)))
        expect(OccurredAt.codec().decode('foo')._tag).toStrictEqual('Left')
        expect(OccurredAt.codec().decode({ foo: 'bar' })._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the raw value', () => {
        const date = new Date()

        expect(OccurredAt.codec().encode(new OccurredAt(date))).toStrictEqual(date)
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        expect(OccurredAt.codec().is(new OccurredAt())).toBeTruthy()
        expect(OccurredAt.codec().is(new UpdatedAt())).toBeFalsy()
      })
    })
  })
})
