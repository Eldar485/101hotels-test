import Vue from 'vue'
import store from './store'

//Main pages
import App from './views/app.vue'
import * as http from "./http";

const app = new Vue({
    el: '#app',
    store: store,
    http: http,
    components: { App }
});
