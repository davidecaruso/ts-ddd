import { OccurredAt } from './OccurredAt'

describe('OccurredAt', () => {
  describe('constructor', () => {
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
        expect(new OccurredAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new OccurredAt(new OccurredAt(date)).toString()).toStrictEqual(date.toISOString())
      })
    })
  })
})
