import { either } from 'fp-ts'
import { CreatedAt } from './created-at'
import { UpdatedAt } from './updated-at'

describe('CreatedAt', () => {
  describe('constructor', () => {
    describe('without input argument', () => {
      it('should return a CreatedAt instance within current date', () => {
        const sut = new CreatedAt()

        expect(sut._type).toStrictEqual('created-at')
        expect(sut.toDateString()).toStrictEqual(new Date().toISOString().substring(0, 10))
      })
    })

    describe('with input argument', () => {
      it('should return a CreatedAt instance', () => {
        const date = new Date(1979, 9, 12, 1)

        expect(new CreatedAt(date).toString()).toStrictEqual(date.toISOString())
        expect(new CreatedAt(date).value).toStrictEqual(date)
        expect(new CreatedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new CreatedAt(date.toString()).value).toStrictEqual(date)
        expect(new CreatedAt(new CreatedAt(date)).toString()).toStrictEqual(date.toISOString())
        expect(new CreatedAt(new CreatedAt(date)).value).toStrictEqual(date)
      })
    })
  })

  describe('equals', () => {
    describe('if CreatedAt instances are equals', () => {
      it('should return true', () => {
        expect(new CreatedAt(new Date(1979, 9, 12, 1)).equals(new CreatedAt(new Date(1979, 9, 12, 1)))).toBeTruthy()
      })
    })

    describe('if CreatedAt instances are not equals', () => {
      it('should return false', () => {
        expect(new CreatedAt().equals(new CreatedAt(new Date(1979, 9, 12, 1)))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const date = new Date()

        expect(CreatedAt.codec().decode(date)).toStrictEqual(either.of(new CreatedAt(date)))
        expect(CreatedAt.codec().decode(date.toISOString())).toStrictEqual(either.of(new CreatedAt(date)))
        expect(CreatedAt.codec().decode(new CreatedAt(date))).toStrictEqual(either.of(new CreatedAt(date)))
        expect(CreatedAt.codec().decode('foo')._tag).toStrictEqual('Left')
        expect(CreatedAt.codec().decode({ foo: 'bar' })._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the raw value', () => {
        const date = new Date()

        expect(CreatedAt.codec().encode(new CreatedAt(date))).toStrictEqual(date)
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        expect(CreatedAt.codec().is(new CreatedAt())).toBeTruthy()
        expect(CreatedAt.codec().is(new UpdatedAt())).toBeFalsy()
      })
    })
  })
})
