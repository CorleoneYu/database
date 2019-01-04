const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

// 解析表单的body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//解除跨域
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);

// 定义接口
app.use('/api/user', require('./api/user.js'));
app.use('/api/goods', require('./api/goods.js'));
app.use('/api/admin', require('./api/admin.js'));
app.use('/api/order', require('./api/order.js'));

//最后 监听
app.listen(5000, ()=>{
  console.log('http://127.0.0.1:5000')
})

