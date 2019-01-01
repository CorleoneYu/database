const db = require('../config/db.js')
const express = require('express');
const router = express.Router();
const utils = require('../utils')

class UserCtroller {
  static initRouter() {
    router.get('/getUserList', (req, res) => {
      // console.log("getUserList:",req);
      const sqlStr = 'SELECT * FROM vw_user;';
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, message: '获取失败'});
        } else {
          //console.log("succ", data);
          data = utils.formatDB(data);
          //console.log("formatUser:", data);
          return res.json({status: 1, data: data});
        }
      })
    })
    
    router.post('/post', (req, res)=>{
      console.log(req.body.test);
      res.json({status: 1, data: '成功'});
    })
    
    //删除用户
    router.post('/deleteUser', (req, res) => {
      let { userId } = req.body;
      console.log("deleteUser参数",userId);
      
      if (!userId) {
        return res.json({status: 0, message: '无userId'});
      }

      const sqlStr = `DELETE FROM vw_user WHERE userId = '${userId}';`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '获取失败'});
        } else {
          //console.log("deleteUser succ", data);
          return res.json({status: 1, data: '删除成功'});
        }
      })
    })

    //增加用户
    router.post('/addUser', (req, res) => {
      let { user } = req.body;
      console.log("addUser参数",user);
      
      if (!user.account || !user.password || !user.name) {
        return res.json({status: 0, message: '无user'});
      }

      const sqlStr = `INSERT INTO vw_user(account, password, name)` +
                      `VALUES ('${user.account}', '${user.password}', '${user.name}');`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '获取失败'});
        } else {
          console.log("addUser succ", data);
          return res.json({status: 1, data: '添加用户成功'});
        }
      })
    })

    //获取地址 参数为用户id
    router.get('/getAddressListByUserId', (req, res) => {
      let { userId } = req.query;
      console.log("getAddressList:",req.query);
      if (!userId) {
        return res.json({status: 0, message: '无userId'});
      }

      const sqlStr = `SELECT * FROM vw_address WHERE userId=${userId};`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, message: '获取失败'});
        } else {
          data = utils.formatDB(data);
          //console.log("formatUser:", data);
          return res.json({status: 1, data: data});
        }
      })
    })

    //登陆
    router.post('/login', (req, res) => {
      let { account, password } = req.body;
      console.log("login参数",account, password);
      
      const sqlStr = `SELECT password,rights FROM tb_admin WHERE account = '${account}';`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '获取失败'});
        } else {
          console.log("mysql.data", data);
          if (data == null) {
            return res.json({status: 0, data: '账号、密码不匹配'});
          }
          data = utils.formatDB(data)[0];
          console.log(data);
          if ( (data && data.password) == password) {
            return res.json({status: 1, data: { msg:'登陆成功', rights: data.rights } });
          } else {
            return res.json({status: 0, data: '账号或密码不匹配'});
          }
        }
      })
    })


    return router;
  }
}

module.exports = UserCtroller.initRouter();