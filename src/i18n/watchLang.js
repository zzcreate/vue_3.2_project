import { watch } from 'vue'
import store from '@/store'

export const watchLang = (...args) => {
  watch(
    () => store.state.app.lang,
    () => { args.forEach(arg => arg(store.state.app.lang)) },
    { deep: true })
}
