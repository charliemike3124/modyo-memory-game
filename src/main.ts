import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'

import App from './App.vue'
import router from './router'

AOS.init({
  duration: 1200
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(AOS)

app.mount('#app')
