'use strict';

const fs = require('fs');
const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const isProd = process.env.NODE_ENV === 'production';

const Controller = require('egg').Controller;

let renderer;

if (isProd) {
	// 生产环境使用本地打包文件来渲染
	const bundle = require('../public/output/vue-ssr-bundle.json')
	const template = fs.readFileSync(resolve('../public/output/index.html'), 'utf-8')
	renderer = createRenderer(bundle, template)
} else {
	// 开发环境使用webpack热更新服务
	require('../../build/dev-server')((bundle, template) => {
		renderer = createRenderer(bundle, template)
	})
}
function createRenderer(bundle, template) {
	return require('vue-server-renderer').createBundleRenderer(bundle, {
		template,
		cache: require('lru-cache')({
			max: 1000,
			maxAge: 1000 * 60 * 15
		})
	})
}



class HomeController extends Controller {
  async index() {
    const { ctx } = this;


	  if (!renderer) {
		  return ctx.body = 'waiting for compilation... refresh in a moment.';
	  }

	  const errorHandler = err => {
		  if (err && err.code === 404) {
			  // 未找到页面
        ctx.status = 404;
			  ctx.body = fs.readFileSync('public/404.html');
		  } else {
			  // 页面渲染错误
			  ctx.status = 500;
			  ctx.body = '500 - Internal Server Error';
			  console.error(`error during render : ${ctx.url}`);
			  console.error(err)
		  }
	  };

	  const context = {
		  title: 'vue-ssr-template',
		  keywords: 'vue-ssr服务端脚手架',
		  description: 'vue-ssr-template, vue-server-renderer',
		  version: '',
		  url: ctx.url,
		  cookies: ctx.cookies
	  }

	  renderer.renderToString(context, (err, html) => {
		  if (err) {
			  return errorHandler(err)
		  }
		  ctx.body = html
		  // console.log(`whole request: ${Date.now() - s}ms`)
	  })
  }
}

module.exports = HomeController;
