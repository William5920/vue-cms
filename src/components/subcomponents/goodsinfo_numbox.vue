<template>
		<div class="mui-numbox" data-numbox-min="1" >
			<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
			<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
			<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
</template>

<script>

	import mui from '../../lib/mui/js/mui.min.js'

	export default {
		mounted(){
			//初始化数字选择框组件
			mui('.mui-numbox').numbox()
			// console.log(this.max)
		},
		methods: {
			countChanged() {
				//每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用传递给父组件
				// console.log(this.$refs.numbox.value, typeof this.$refs.numbox.value)
				this.$emit('getcount', parseInt(this.$refs.numbox.value))
			}
		},
		props: ['max'],
		watch: {
			//监听max的值
			max: function(newVal, oldVal) {
				mui('.mui-numbox').numbox().setOption('max', newVal)
				// console.log(this.max)
			}
		}
	}
</script>

<style lang="scss"></style>