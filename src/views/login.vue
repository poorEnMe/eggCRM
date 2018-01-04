<template>
    <div>
        <form action="/login" method="post">
            <h2>登陆</h2>
            <input  type="text" v-model="account" required=true autofocus="true" placeholder="请输入账号"/>
            <input  type="password" v-model="xpassword" autocomplete="new-password" placeholder="密码" required="true"/>
            <a  v-on:click="loginCheck" id="loginsubmit">登陆</a>
        </form>
    </div>
</template>

<script>
	import axios from 'axios';

	export default {
		name:'login',
		data(){
			return{
				account:'',
				xpassword:'',
                title: 'Login',
                keywords: 'login'
			}
		},
		methods:{
			loginCheck:async function(){
				let res = {};
				try {
					res = await axios.post('/loginCheck',{
						account:this.account,
						xpassword:this.xpassword
					})
				}catch (e){
					console.log(e);
				}
				if(res.data){
					if(res.data.result === 1 ){
						alert('登陆成功');
                        this.$router.push({ path: 'index' })
					}else{
						alert('账号或密码错误');
					}

				}
			}
		}
	}

</script>

<style scoped>

</style>