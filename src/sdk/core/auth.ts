import Cookies from 'js-cookie'
import store from './store'

const TokenKey = store.config.tokenKey

export function getToken(TokenKey) {
  if (Cookies.get(TokenKey) != null) {
    return Cookies.get(TokenKey)
  } else {
    return localStorage.getItem(TokenKey)
  }
}

export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  console.log('storage vooki')
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}
