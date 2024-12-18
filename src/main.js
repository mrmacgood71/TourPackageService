import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import * as jwt_decode from 'jwt-decode';

const JwtDecode = function (Vue, options) {
    Vue.mixin({
        created: function () {
            this.jwtDecode = jwt_decode
        }
    })
}

const app = createApp(App);
app.use(router);
app.mount('#app');
