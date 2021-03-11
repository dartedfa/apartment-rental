const localStorageKey = '__auth_token__'
const authURL = process.env.REACT_APP_AUTH_URL

function getToken() {
  return window.localStorageKey.getItem(localStorageKey)
}

function handleUserResponse({user, token}) {
  window.localStorage.setItem(localStorageKey, token)
  return user
}

function login({email, password}) {
  return client('login', {email, password}).then(handleUserResponse)
}

function register({email, password}) {
  return client('register', {email, password}).then(handleUserResponse)
}

function logout() {
  window.localStorage.removeItem(localStorageKey)
}

async function client(endpoint, {email, password, ...body}) {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(email + ':' + password)}`,
    },
    body: JSON.stringify({...body}),
  }

  return window.fetch(`${authURL}/${endpoint}`, config).then(async response => {
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {getToken, register, login, logout}