import { DeletedAt } from './DeletedAt'

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
        expect(new DeletedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new DeletedAt(new DeletedAt(date)).toString()).toStrictEqual(date.toISOString())
      })
    })
  })
})
