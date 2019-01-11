<template>
	<div>
		注册页面
		<button @click='go'>注册</button>
		<router-link to='/user'>to_user</router-link>
		<router-view></router-view>
	</div>
</template>


<script type="text/javascript">
	export default{
		methods:{
			go(){
				let redirect=this.$route.query.redirect;
				alert('注册成功');
				this.$router.push('/login')
			}
		}
	}
</script>