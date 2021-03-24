import {isLatitude, isLongitude} from '../helpers'

test('isLatitude checks latitude correctly.', async () => {
  const falsyLatitude = 90.123
  const truthyLatitude = 60.21233
  expect(isLatitude(falsyLatitude)).toBeFalsy()
  expect(isLatitude(truthyLatitude)).toBeTruthy()
})

test('isLongitude checks longitude correctly.', async () => {
  const falsyLongitude = 210.2131231
  const truthyLongitude = 60.21233
  expect(isLongitude(falsyLongitude)).toBeFalsy()
  expect(isLongitude(truthyLongitude)).toBeTruthy()
})
