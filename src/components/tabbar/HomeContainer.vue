<template>
	<div>
		
		<!--轮播图区域-->
		<swiper :lunbotuList="lunbotuList" :isFull="true"></swiper>

		<!-- 6六宫格区域 -->
				<ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/news.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="../../images/picture.png">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
		                    <img src="../../images/shopcar.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/message.png">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/video.png">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/contact.png">
		                    <div class="mui-media-body">联系我们</div></a></li>
		            
		        </ul> 

	</div>
</template>

<script>

	//导入轮播图子组件
	import swiper from '../subcomponents/swiper.vue'

	import { Toast } from 'mint-ui'

	export default {
		data(){
			return {
				lunbotuList: []
			}
		},
		created() {
			this.getLunbotu()
		},
		methods: {
			getLunbotu() {
				this.$http.get("api/getlunbo").then(result => {
					// console.log(result.body)
					if(result.body.status === 0) {
						this.lunbotuList = result.body.message
					} else {
						Toast('加载轮播图失败。。。')
					}
				})
			}
		},
		components: {
			swiper
		}
	}
	
</script>

<style lang="scss" scoped>


	.mui-grid-view.mui-grid-9 {
		background-color: white;
		border: none;

		img {
			width: 60px;
			height: 60px;
		}
	}

	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border: none;
	}


</style>