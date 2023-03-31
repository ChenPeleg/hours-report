import { describe, it } from 'node:test'
import assert from 'node:assert'
import { DateAndTimeUtil } from '../../src/utils/dateAndTime.js'

describe('Time utils', () => {
  describe('yearAndDateToDateObj', () => {
    it('yearAndDateToDateObj returns date correctly', () => {
      const date = DateAndTimeUtil.dateAndTimeToDateObj(
        '2023-01-25',
        '19:19:02'
      )
      assert.equal(date.toString(), new Date('2023-01-25T19:19:02Z').toString())
    })
    it('yearAndDateToDateObj throws if data is missing', () => {
      assert.throws(() => DateAndTimeUtil.dateAndTimeToDateObj('', '19:19:02'))
    })
  })
})
