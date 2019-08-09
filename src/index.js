//项目的js入口文件

import Vue from 'vue'
import app from './App.vue'


import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站，先把localStorage中的数据读取出来存储到 state.car 中
var car = JSON.parse(localStorage.getItem('car') || '[]')



var store = new Vuex.Store({
	state: { // this.$store.state.***
		car: car
		// 将购物车中的数据用一个数组存储起来，里面每一个元素就是一个
		// 商品对象{ id: 商品ID, count: 要购买的数量, price: 商品的单价, selected: false}
	},
	mutations: { // this.$store.commit('方法名'， ‘按需传递唯一的参数’)
		addToCar(state, goodsinfo) {
			// 点击加入购物车，把商品信息保存到store中的car上
			//如果购物车有该商品，则只需更新count
			//如果购物车中没有该商品，则将该商品对象push到car中

			var flag = false

			//如果购物车有该商品，则只需更新count
			state.car.some(item => {
				if(item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true
				}
			})

			//如果购物车中没有该商品，则将该商品对象push到car中
			if(!flag) {
				state.car.push(goodsinfo)
			}

			//更新完car之后，将数据保存到localStorage中
			localStorage.setItem('car',JSON.stringify(state.car))

		},
		updateGoodsInfo(state,goodsinfo) {
			state.car.some(item => {
				if(item.id == goodsinfo.id) {
					item.count = parseInt(goodsinfo.count)
					return true
				}
			})

			//修改完商品的数量，将数据保存到localStorage中
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFromCar(state, id) {
			//根据id从store中删除购物车里对应的商品
			state.car.some((item, i) => {
				if(item.id == id) {
					state.car.splice(i, 1)
					return true
				}
			})

			//将删除完毕后的最新购物车数据同步到本地存储中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsSelected(state, info) {
			state.car.some(item => {
				if(item.id == info.id) {
					item.selected = info.selected
				}
			})

			//将最新数据同步到本地存储中
			localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: { // this.$store.getters.***
		getAllCount(state) {
			var c = 0
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		//获取购物车中各个商品的数量，解决购物车组件中numbox的初始值问题，返回对象形式为{ 商品ID: 商品数量 }
		getGoodsCount(state) { 
			var idCount = {}
			state.car.forEach(item => {
				idCount[item.id] = item.count
			})
			return idCount
		},
		getGoodsSelected(state) {
			var idSelected = {}
			state.car.forEach(item => {
				idSelected[item.id] = item.selected
			})

			return idSelected
		},
		getGoodsCountAndAmount(state) {
			var obj = {
				count: 0,
				amount: 0
			}

			state.car.forEach(item => {
				if(item.selected) {
					obj.count += item.count
					obj.amount += item.count * item.price
				}
			})

			return obj
		}
	}
})

import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
//全局设置 post 时候表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true

//导入mint-ui中的相关组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat',function(dateStr, pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dateStr).format(pattern)
})

//使用vue的缩略图插件vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)





var vm = new Vue({
	el: '#app',
	render: function(createElements) {
		return createElements(app)
	},
	router,
	store//挂载vuex状态管理对象
})
