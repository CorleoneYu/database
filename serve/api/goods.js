const db = require('../config/db.js')
const express = require('express');
const router = express.Router();
const utils = require('../utils')

class GoodsCtroller {
  static initRouter() {
    //获取商品列表
    router.get('/getGoodsList', (req, res) => {
      const sqlStr = 'SELECT * FROM vw_goods;';
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

    //删除商品
    router.post('/deleteGoods', (req, res) => {
      let { goodsId } = req.body;
      console.log("deleteGoods参数",goodsId);
      
      if (!goodsId) {
        return res.json({status: 0, message: '无goodsId'});
      }

      const sqlStr = `DELETE FROM vw_goods WHERE id = '${goodsId}';`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '获取失败'});
        } else {
          //console.log("deleteGoods succ", data);
          return res.json({status: 1, data: '删除成功'});
        }
      })
    })

    //增加商品
    router.post('/addGoods', (req, res) => {
      let { goods } = req.body;
      console.log("addGoods参数",goods);
      
      if (!goods.name || !goods.price || !goods.detail) {
        return res.json({status: 0, message: '无goods'});
      }

      const sqlStr = `INSERT INTO vw_goods(name, price, detail) ` +
                      `VALUES("${goods.name}", ${goods.price}, "${goods.detail}");`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '添加商品失败'});
        } else {
          // console.log("addGoods succ", data);
          return res.json({status: 1, data: '添加商品成功'});
        }
      })
    })

    //编辑商品
    router.post('/editGoods', (req, res) => {
      let { goods } = req.body;
      console.log("editGoods参数",goods);
      
      if (!goods.id || !goods.name || !goods.price || !goods.detail) {
        return res.json({status: 0, message: '无goods'});
      }

      const sqlStr = `UPDATE vw_goods ` +
                      `SET name="${goods.name}", price=${goods.price}, detail="${goods.detail}"` +
                      `WHERE id=${goods.id};`
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '编辑商品失败'});
        } else {
          // console.log("editGoods succ", data);
          return res.json({status: 1, data: '编辑商品成功'});
        }
      })
    })

    //获取详细图片 参数为商品id
    router.get('/getImgListByGoodsId', (req, res) => {
      let { goodsId } = req.query;
      console.log("getImgListByGoodsId:",req.query);
      if (!goodsId) {
        return res.json({status: 0, message: '无goodsId'});
      }

      const sqlStr = `SELECT * FROM vw_goods_img WHERE goodsId=${goodsId};`;
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

    //增加商品图片
    router.post('/addGoodsImg', (req, res) => {
      let { img } = req.body;
      console.log("addGoodsImg参数",img);
      
      if (!img.goodsId || !img.url) {
        return res.json({status: 0, message: '无img'});
      }

      const sqlStr = `INSERT INTO tb_img(goods_id, url) ` +
                      `VALUES (${img.goodsId}, "${img.url}");`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '添加商品图片失败'});
        } else {
          // console.log("addGoodsImg succ", data);
          return res.json({status: 1, data: '添加商品图片成功'});
        }
      })
    })

    //删除商品图片
    router.post('/deleteGoodsImg', (req, res) => {
      let { imgId } = req.body;
      console.log("deleteGoodsImg参数",imgId);
      
      if (!imgId) {
        return res.json({status: 0, message: '无img'});
      }

      const sqlStr = `DELETE FROM tb_img ` +
                      `WHERE id=${imgId};`;
      db.query(sqlStr, (err, data) => {
        if (err) {
          console.log("err", err);
          return res.json({status: 0, data: '删除商品图片失败'});
        } else {
          // console.log("deleteGoodsImg succ", data);
          return res.json({status: 1, data: '删除商品图片成功'});
        }
      })
    })
    return router;
  }
}

module.exports = GoodsCtroller.initRouter();