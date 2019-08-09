<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
			<span>点击：{{ photoinfo.click }}次</span>
		</p>

		<hr>

		<!--缩略图区域-->
		<div class="thumbs">
			<vue-preview :slides="slide1" @close="handleClose"></vue-preview>
		</div>
		

		<!--图片内容区域-->
		<div class="content" v-html="photoinfo.content"></div>

		<!--这里放置一个现成的评论子组件-->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment.vue'
	export default {
		data(){
			return {
				//从路由地址中获取图片id
				id: this.$route.params.id,
				photoinfo: {},
				slide1: []//缩略图的数组
			}
		},
		created(){
			this.getPhotoInfo()
			this.getThumbs()
		},
		methods: {
			getPhotoInfo(){
				this.$http.get('api/getimageInfo/' + this.id).then(result => {
					if(result.body.status === 0){
						this.photoinfo = result.body.message[0]
					}
				})
			},
			getThumbs(){
				this.$http.get('api/getthumimages/' + this.id).then(result => {
					if(result.body.status === 0){
						// console.log(result.body)
						//循环每个图片数据，补全缩略图要求的数据属性
						result.body.message.forEach(item => {
							item.msrc = item.src
							item.alt = '缩略图'
							item.title = '图片标题'
							item.w = 600
							item.h = 400
						})

						this.slide1 = result.body.message
					}
				})
			},
			handleClose () {
		        console.log('close event')
		    }
		},
		components: {
			'cmt-box': comment
		}
	}
</script>

<style lang="scss">
	.photoinfo-container {
		padding: 3px;
		h3 {
			text-align: center;
			margin: 15px;
			font-size: 15px;
			color: #26a2ff;
		}

		.subtitle {
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}

		.content {
			font-size: 13px;
			line-height: 30px;
		}

		.thumbs {
		   .my-gallery {
		    display: flex;
		    flex-wrap: wrap;
		    figure {
		      width: 30%;
		      margin: 5px;
		      img {
		        width: 100%;
		        box-shadow: 0 0 5px #999;
		      }
		    }
		  }
		}

	}
</style>










