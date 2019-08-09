<template>
	<div class="goods-list">
<!-- 		<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
			<img :src="item.img_url">
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">¥{{ item.sell_price }}</span>
					<span class="old">¥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</router-link> -->

		<div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
			<img :src="item.img_url">
			<h1 class="title">{{ item.title }}</h1>
			<div class="info">
				<p class="price">
					<span class="now">¥{{ item.sell_price }}</span>
					<span class="old">¥{{ item.market_price }}</span>
				</p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{ item.stock_quantity }}件</span>
				</p>
			</div>
		</div>

		<!-- 加载更多 -->
		<mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageindex: 1,//分页的页数
				goodslist: []//存放商品数据
			}
		},
		created(){
			//进入页面，获取商品列表
			this.getGoodsList()
		},
		methods: {
			//获取商品列表
			getGoodsList() {
				this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result => {
					if(result.body.status === 0){
						this.goodslist = this.goodslist.concat(result.body.message)
					}
				})
			},
			//加载更多商品
			getMore() {
				this.pageindex++
				this.getGoodsList()
			},
			//使用编程式导航跳转到商品详情页面
			goDetail(id) {
				// 1.第1种使用方式
				// this.$router.push('/home/goodsinfo/' + id)
				// 2.第2种使用方式
				// this.$router.push({ path: '/home/goodsinfo/' + id })
				// 3.第3种使用方式
				this.$router.push({ name: 'goodsinfo', params: { id } })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 7px;
		justify-content: space-between;

		.goods-item {
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 4px 0;
			padding: 2px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;


			img {
				width: 100%;
			}

			.title {
				font-size: 14px;
			}

			.info {

				background-color: #eee;
				
				p {
					margin: 0;
					padding: 5px;
				}

				.price {
					.now {
						color: red;
						font-size: 16px;
						font-weight: bold;
					}

					.old {
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}

				.sell {
					display: flex;
					justify-content: space-between;
					font-size: 13px;
				}
			}
		}
	}
</style>











