const mysql = require('mysql');

//1. 连接
//createConnection(哪台服务器, 用户名, 密码, 数据库)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mall'
});

module.exports = db