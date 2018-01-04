const Controller = require('egg').Controller;
class LoginController extends Controller {

	async loginCheck(){
		const { ctx } = this;
		console.log(ctx.request.body);
		let account = ctx.request.body.account;
		let xpassword = ctx.request.body.xpassword;
		let result = await ctx.model.User.auth(account,xpassword);
		if(result){
			this.ctx.body = {
				result:1
			}
		}else{
			this.ctx.body = {
				result:0
			}
		}
	}
}

module.exports = LoginController;