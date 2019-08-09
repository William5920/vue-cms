<template>
	<div>
		<cmtbox :id="this.$route.params.id"></cmtbox>
	</div>
</template>

<script>
	//导入评论组件
	import cmtbox from '../subcomponents/comment.vue'

	//注册评论组件
	export default {
		components: {
			cmtbox
		}
	}

</script>

<style lang="scss" scoped>
	
</style>