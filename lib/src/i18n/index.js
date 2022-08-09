import { createI18n } from 'vue-i18n'

import EN from './en'
import ZH from './zh'

//  const messages = {
//   en: {
//     msg:
//       { title: 'User Login' }
//   },
//   zh: {
//     msg: {
//       title: '用户登录'
//     }
//   }
// }
const messages = {
  en: { ...EN },
  zh: { ...ZH }
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  localStorage.setItem('lang', langCode)
  // return 'en'
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages
})

export default i18n
