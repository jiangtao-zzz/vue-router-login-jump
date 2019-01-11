<template>
	<div>
	<button type="button" @click='login'>登录</button>
	<router-link to='/register'>去注册</router-link>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				str:'我是列表页',
				msg:''
			}
		},
		created(){
		},
		methods:{
			login(){
				let redirect=this.$route.query.redirect;
				localStorage.setItem('token', true);
				if(redirect){
					this.$router.push({
						path:redirect
					})
				}else{
					this.$router.push('/');
				}
				

			}
		}
	}	
</script>
