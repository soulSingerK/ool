var koa = require('koa');
var koaRouter = require('koa-router');
var app = new koa();
var router = new koaRouter();


var time = require('./index/serverTime.js')
router.get('/api/common/getservicetime', function *(next) {
  this.body = time
})

var indexData = require('./index/index.js')
router.get('/api/home/getactivityinfo', function *(next) {
  this.body = indexData.activity
})
router.get('/api/home/getjoinorpayment', function *(next) {
  this.body = indexData.joinData
})
router.get('/api/home/getjoinorpaymentsevenorthirty', function *(next) {
  this.body = indexData.joinDataT
})

// 开始服务并生成路由
app.use(router.routes())
.use(router.allowedMethods());
app.listen(4000);