import { TOKEN_TIME, TOKEN_TIME_VALUE } from './contant'

// 登录时设置时间
export const setTokenTime = () => { // 不return， return undefined
  localStorage.setItem(TOKEN_TIME, Date.now())
}

// 获取  隐式return
export const getTokenTime = () => localStorage.getItem(TOKEN_TIME)

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  return currentTime - tokenTime > TOKEN_TIME_VALUE
}
