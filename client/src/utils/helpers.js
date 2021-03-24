import isEmail from 'validator/lib/isEmail'
import * as R from 'ramda'

export function isLatitude(num) {
  return isFinite(num) && Math.abs(num) <= 90
}

export function isLongitude(num) {
  return isFinite(num) && Math.abs(num) <= 180
}

export function validateEmptyFields(state, except = {}) {
  const keys = Object.keys(state)
  let isValid = true

  keys.forEach(key => {
    if (
      key === '_id' ||
      !R.isEmpty(state[key]) ||
      (!!except[key] && !!R.isEmpty(state[key]))
    )
      return
    if (!state[key]) {
      isValid = false
    }
  })

  return isValid
}

export function validateUserForm(state, except = {}) {
  const isValid = validateEmptyFields(state, except)

  if (!isValid) return 'Please fill all fields.'

  const {email, password} = state

  if (!isEmail(email)) return 'Please provide correct E-mail.'

  if (except['password'] && !password) return false
  if (password.length < 6) return 'Please provide strong Password.'

  return false
}
