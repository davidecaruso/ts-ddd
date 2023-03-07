import { either } from 'fp-ts'
import { DeletedAt } from './DeletedAt'
import { UpdatedAt } from './UpdatedAt'

describe('DeletedAt', () => {
  describe('constructor', () => {
    describe('without input argument', () => {
      it('should return a DeletedAt instance within current date', () => {
        const sut = new DeletedAt()

        expect(sut._type).toStrictEqual('deleted-at')
        expect(sut.toDateString()).toStrictEqual(new Date().toISOString().substring(0, 10))
      })
    })

    describe('with input argument', () => {
      it('should return a DeletedAt instance', () => {
        const date = new Date(1979, 9, 12, 1)

        expect(new DeletedAt(date).toString()).toStrictEqual(date.toISOString())
        expect(new DeletedAt(date).value).toStrictEqual(date)
        expect(new DeletedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new DeletedAt(date.toString()).value).toStrictEqual(date)
        expect(new DeletedAt(new DeletedAt(date)).toString()).toStrictEqual(date.toISOString())
        expect(new DeletedAt(new DeletedAt(date)).value).toStrictEqual(date)
      })
    })
  })

  describe('equals', () => {
    describe('if DeletedAt instances are equals', () => {
      it('should return true', () => {
        expect(new DeletedAt(new Date(1979, 9, 12, 1)).equals(new DeletedAt(new Date(1979, 9, 12, 1)))).toBeTruthy()
      })
    })

    describe('if DeletedAt instances are not equals', () => {
      it('should return false', () => {
        expect(new DeletedAt().equals(new DeletedAt(new Date(1979, 9, 12, 1)))).toBeFalsy()
      })
    })
  })

  describe('codec', () => {
    describe('decode', () => {
      it('should either return an instance or not', () => {
        const date = new Date()

        expect(DeletedAt.codec().decode(date)).toStrictEqual(either.of(new DeletedAt(date)))
        expect(DeletedAt.codec().decode(date.toISOString())).toStrictEqual(either.of(new DeletedAt(date)))
        expect(DeletedAt.codec().decode(new DeletedAt(date))).toStrictEqual(either.of(new DeletedAt(date)))
        expect(DeletedAt.codec().decode('foo')._tag).toStrictEqual('Left')
        expect(DeletedAt.codec().decode({ foo: 'bar' })._tag).toStrictEqual('Left')
      })
    })

    describe('encode', () => {
      it('should return the raw value', () => {
        const date = new Date()

        expect(DeletedAt.codec().encode(new DeletedAt(date))).toStrictEqual(date)
      })
    })

    describe('is', () => {
      it('should check if instance or not', () => {
        expect(DeletedAt.codec().is(new DeletedAt())).toBeTruthy()
        expect(DeletedAt.codec().is(new UpdatedAt())).toBeFalsy()
      })
    })
  })
})
