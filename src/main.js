import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import VueSession from 'vue-session'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://127.0.0.1:8090/TGS11_CI_A_9535/index.php';
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: { App }
}).$mount('#app')
