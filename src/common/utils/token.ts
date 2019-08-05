import Cookie from 'js-cookie'

const tokenKey = 'vue-admin-token'

export const getToken = () => Cookie.get(tokenKey)
export const setToken = (token: string) => Cookie.set(tokenKey,token)
export const removeToken = () => Cookie.remove(tokenKey)