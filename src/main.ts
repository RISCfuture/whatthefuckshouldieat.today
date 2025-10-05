import 'normalize.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Bugsnag, { type Plugin } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import BugsnagPerformance from '@bugsnag/browser-performance'
import App from './App.vue'

Bugsnag.start({
  apiKey: '85bd5d55dbd4e994e586b0b84b48b61f',
  plugins: [<Plugin>new BugsnagPluginVue()]
})
BugsnagPerformance.start({ apiKey: '85bd5d55dbd4e994e586b0b84b48b61f' })
const bugsnagVue = Bugsnag.getPlugin('vue')

const app = createApp(App)
app.use(createPinia())
if (bugsnagVue) {
  app.use(bugsnagVue)
}
app.mount('main')
