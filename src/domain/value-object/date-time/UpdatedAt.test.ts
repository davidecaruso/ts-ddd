import { CreatedAt } from './CreatedAt'
import { UpdatedAt } from './UpdatedAt'

describe('UpdatedAt', () => {
  describe('constructor', () => {
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
        expect(new UpdatedAt(date.toString()).toString()).toStrictEqual(date.toISOString())
        expect(new UpdatedAt(new UpdatedAt(date)).toString()).toStrictEqual(date.toISOString())
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
})
