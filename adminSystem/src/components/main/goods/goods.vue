<template>
  <div class="goods">
    <el-dialog :title="goodsDialog.isAdd ? '添加商品' : '编辑商品'" :visible.sync="goodsDialog.isShow">
      <div class="w400">
        <div class="input-item" v-if="goodsDialog.isEdit">
          <span>商品id</span>
          <el-input v-model="goodsDialog.id" disabled></el-input>
        </div>
        <div class="input-item">
          <span>商品名称</span>
          <el-input v-model="goodsDialog.name"></el-input>
        </div>
        <div class="input-item">
          <span>商品价格</span>
          <el-input v-model="goodsDialog.price"></el-input>
        </div>
        <div class="input-item">
          <span>商品描述</span>
          <el-input v-model="goodsDialog.detail"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeGoodsDiolog">取 消</el-button>
        <el-button type="primary" @click="setGoods">确定</el-button>
      </span>
    </el-dialog>

    <el-card>
      <div slot="header" class="card-header">
        <span>商品列表</span>
        <el-button @click="openGoodsDialog({type: 'add'})" type="primary">添加商品</el-button>
      </div>
      <el-table :data="goodsList" stripe>
        <el-table-column prop="id" label="id" width="60"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="detail" label="商品描述"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="toGoodsDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="deleteGoods(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="openGoodsDialog({type: 'edit', goods: scope.row})" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getGoodsList, deleteGoods, addGoods, editGoods } from 'api/goods'
export default {
  data() {
    return {
      goodsList: [],
      goodsDialog: {
        isShow: false,
        isAdd: false,
        isEdit: false,
        id: -1,
        name: '',
        price: 0,
        detail: ''
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getGoodsList();
    },
    getGoodsList() {
      getGoodsList()
      .then (resp => {
        console.log(resp);
        this.goodsList = resp;
      })
    },
    deleteGoods(goods) {
      console.log(goods);
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        deleteGoods(goods.id)
          .then(resp => {
            this.getGoodsList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(err => {
            console.log(err);
            this.$message.error("删除失败");
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    toGoodsDetail(goods) {
      console.log(goods);
      this.$router.push({
        name: 'goodsDetail',
        params: {
          goods
        }
      })
    },
    openGoodsDialog(val) {
      let {type} = val;
      this.goodsDialog.isShow = true;
      if (type == 'add') {
        this.goodsDialog.id = -1;
        this.goodsDialog.name = '';
        this.goodsDialog.price = 0;
        this.goodsDialog.detail = '';
        this.goodsDialog.isAdd = true;
        this.goodsDialog.isEdit = false;
      } else if (type == 'edit') {
        let {goods} = val;
        this.goodsDialog.id = goods.id;
        this.goodsDialog.name = goods.name;
        this.goodsDialog.price = goods.price;
        this.goodsDialog.detail = goods.detail;
        this.goodsDialog.isAdd = false;
        this.goodsDialog.isEdit = true;
      }
    },
    closeGoodsDiolog() {
      this.goodsDialog.isShow = false;
      this.goodsDialog.isAdd = false;
      this.goodsDialog.isEdit = false;
    },
    setGoods() {
      if (this.goodsDialog.isAdd) {
        addGoods(this.goodsDialog)
        .then( resp => {
          this.getGoodsList();
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.closeGoodsDiolog();
        })
      } else if (this.goodsDialog.isEdit){
        editGoods(this.goodsDialog)
        .then( resp => {
          this.getGoodsList();
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          this.closeGoodsDiolog();
        })
      }
    }
  }
}
</script>

<style>

</style>
