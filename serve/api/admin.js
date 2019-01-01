const db = require('../config/db.js')
const express = require('express');
const router = express.Router();
const utils = require('../utils')

class AdminCtroller {
  static initRouter() { 
    //获取管理员列表
    router.get('/getAdminList', (req, res) => {
      const sqlStr = 'SELECT * FROM vw_admin;';
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, message: '获取失败'});
        } else {
          data = utils.formatDB(data);
          //console.log("format:", data);
          return res.json({status: 1, data: data});
        }
      })
    })

    //设置管理员权限
    router.post('/setRights', (req, res) => {
      let { adminId, rights } = req.body;
      console.log("setRights参数",adminId, rights);
      
      if (!adminId || !rights) {
        return res.json({status: 0, message: '无adminId, rights'});
      }
      
      const sqlStr = `UPDATE vw_admin SET rights='${rights}' WHERE id='${adminId}';`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '设置失败'});
        } else {
          //console.log("deleteUser succ", data);
          return res.json({status: 1, data: '设置成功'});
        }
      })
    })
    return router;
  }
}

module.exports = AdminCtroller.initRouter();