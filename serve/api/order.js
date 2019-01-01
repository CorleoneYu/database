const db = require('../config/db.js')
const express = require('express');
const router = express.Router();
const utils = require('../utils')

class OrderCtroller {
  static initRouter() { 
    router.get('/getOrderList', (req, res) => {
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

    return router;
  }
}

module.exports = OrderCtroller.initRouter();