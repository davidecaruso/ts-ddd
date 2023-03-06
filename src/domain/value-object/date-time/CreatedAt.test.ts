import { CreatedAt } from './CreatedAt'

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
        expect(new CreatedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new CreatedAt(new CreatedAt(date)).toString()).toStrictEqual(date.toISOString())
      })
    })
  })
})
