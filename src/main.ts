import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './plugins'
import SvgIcon from 'vue-svgicon'

Vue.use(SvgIcon, {
  tagName: 'svg-ivon',
  defaultHeight: '1em',
  defaultWidth: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
