//项目的js入口文件

import Vue from 'vue'
import app from './App.vue'

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)


var vm = new Vue({
	el: '#app',
	render: function(createElements) {
		return createElements(app)
	},
	router
})
