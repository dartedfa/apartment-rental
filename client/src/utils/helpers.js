import isEmail from 'validator/lib/isEmail'

export function isLatitude(num) {
  return isFinite(num) && Math.abs(num) <= 90
}

export function isLongitude(num) {
  return isFinite(num) && Math.abs(num) <= 180
}

export function validateEmptyFields(state) {
  const keys = Object.keys(state)
  let isValid = true

  keys.forEach(key => {
    if (!state[key]) {
      isValid = false
    }
  })

  return isValid
}

export function validateUserForm(state) {
  const isValid = validateEmptyFields(state)

  if (!isValid) return 'Please fill al fields.'

  const {email, password} = state

  if (!isEmail(email)) return 'Please provide correct E-mail.'

  if (password.length < 6) return 'Please provide strong Password.'

  return false
}
