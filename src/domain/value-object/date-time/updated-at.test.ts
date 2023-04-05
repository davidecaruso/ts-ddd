import { either } from 'fp-ts'
import { CreatedAt, UpdatedAt } from '../index'

describe('UpdatedAt', () => {
  describe('constructor', () => {
    describe('with CreatedAt instance', () => {
      it('should return a Foo instance', () => {
        const date = new Date(1979, 9, 12, 1)
        const sut = new UpdatedAt(new UpdatedAt(date))

        expect(sut._type).toStrictEqual('updated-at')
        expect(sut.toDateString()).toStrictEqual(date.toISOString().substring(0, 10))
      })
    })

    describe('without input argument', () => {
      it('should return a UpdatedAt instance within current date', () => {
        const sut = new UpdatedAt()

        expect(sut._type).toStrictEqual('updated-at')
        expect(sut.toDateString()).toStrictEqual(new Date().toISOString().substring(0, 10))
      })
    })

    describe('with input argument', () => {
      it('should return a UpdatedAt instance', () => {
        const date = new Date(1979, 9, 12, 1)

        expect(new UpdatedAt(date).toString()).toStrictEqual(date.toISOString())
        expect(new UpdatedAt(date).value).toStrictEqual(date)
        expect(new UpdatedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new UpdatedAt(date.toString()).value).toStrictEqual(date)
        expect(new UpdatedAt(new UpdatedAt(date)).toString()).toStrictEqual(date.toISOString())
        expect(new UpdatedAt(new UpdatedAt(date)).value).toStrictEqual(date)
      })
    })
  })

  describe('fromCreatedAt', () => {
    it('should return a UpdatedAt instance', () => {
      const createdAt = new CreatedAt()

      const sut = UpdatedAt.fromCreatedAt(createdAt)

      expect(sut.toString()).toStrictEqual(createdAt.toString())
    })
  })

  describe('equals', () => {
    describe('if UpdatedAt instances are equals', () => {
      it('should return true', () => {
        expect(new UpdatedAt(new Date(1979, 9, 12, 1)).equals(new UpdatedAt(new Date(1979, 9, 12, 1)))).toBeTruthy()
      })
    })

    describe('if UpdatedAt instances are not equals', () => {
      it('should return false', () => {
        expect(new UpdatedAt().equals(new UpdatedAt(new Date(1979, 9, 12, 1)))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const date = new Date()

        expect(UpdatedAt.codec().decode(date)).toStrictEqual(either.of(new UpdatedAt(date)))
        expect(UpdatedAt.codec().decode(date.toISOString())).toStrictEqual(either.of(new UpdatedAt(date)))
        expect(UpdatedAt.codec().decode(new UpdatedAt(date))).toStrictEqual(either.of(new UpdatedAt(date)))
        expect(UpdatedAt.codec().decode('foo')._tag).toStrictEqual('Left')
        expect(UpdatedAt.codec().decode({ foo: 'bar' })._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the raw value', () => {
        const date = new Date()

        expect(UpdatedAt.codec().encode(new UpdatedAt(date))).toStrictEqual(date)
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        expect(UpdatedAt.codec().is(new UpdatedAt())).toBeTruthy()
        expect(UpdatedAt.codec().is(new CreatedAt())).toBeFalsy()
      })
    })
  })
})
