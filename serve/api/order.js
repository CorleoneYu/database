const db = require('../config/db.js')
const express = require('express');
const router = express.Router();
const utils = require('../utils')

class OrderCtroller {
  static initRouter() { 
    router.get('/getOrderList', (req, res) => {
      let { userName, state } = req.query;
      if (!state) {
        return res.json({status: 0, message: '无state'});
      }
      console.log("getOrderList:",req.query);

      let sqlStr;
      if (state == 0) {
        sqlStr = `SELECT * FROM vw_order_user_address ` +
                  `WHERE name like "%${userName}%";`
      } else {
        sqlStr = `SELECT * FROM vw_order_user_address ` +
                  `WHERE name like "%${userName}%"` + 
                  `AND state = ${state};`
      }
      
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
    
    //发货
    router.post('/delivery', (req, res) => {
      let { orderId } = req.body;
      console.log("delivery", orderId);
      
      if (!orderId) {
        return res.json({status: 0, message: '无img'});
      }
      
      const sqlStr = `UPDATE tb_order SET state = 3 ` +
                      `WHERE id=${orderId};`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '发货失败'});
        } else {
          // console.log("addGoodsImg succ", data);
          return res.json({status: 1, data: '发货成功'});
        }
      })
    })

    //获取订单详情 参数为订单id
    router.get('/getOrderDetailByOrderId', (req, res) => {
      let { orderId } = req.query;
      console.log("getOrderDetailByOrderId:",req.query);
      if (!orderId) {
        return res.json({status: 0, message: '无orderId'});
      }

      const sqlStr = `SELECT * FROM vw_orderdetail_order_goods WHERE order_id=${orderId};`;
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
    return router;
  }
}

module.exports = OrderCtroller.initRouter();