<template>
  <div class="goods-detail">
    <el-dialog title="添加商品图片'" :visible.sync="imgDialog.isShow">
      <div class="w400">
        <div class="input-item">
          <span>图片链接</span>
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入图片url" v-model="imgDialog.imgUrl"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeImgDiolog">取 消</el-button>
        <el-button type="primary" @click="addGoodsImg">确定</el-button>
      </span>
    </el-dialog>

    <el-card>
      <div slot="header" class="card-header">
        <span>商品信息</span>
        <el-button type="primary" @click="openImgDiolog">添加商品图片</el-button>
      </div>
      <div class="lh200">
        <p><span class="fstrong mr10">商品名称:</span> <span>{{goods.name}}</span></p>
        <p><span class="fstrong mr10">商品价格:</span> <span> ￥{{goods.price}}</span></p>
        <p><span class="fstrong mr10">商品描述:</span> <span>{{goods.detail}}</span></p>
      </div>
      <el-table :data="imgList" stripe> 
        <el-table-column prop="imgId" label="图片id" width="100"></el-table-column>
        <el-table-column prop="imgUrl" label="图片链接" width="350"></el-table-column>
        <el-table-column label="预览">
          <template slot-scope="scope">
            <img class="goods-img" :src="scope.row.imgUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteGoodsImg(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getImgList, addGoodsImg, deleteGoodsImg } from 'api/goods'
export default {
  data() {
    return {
      goods: null,
      imgList: [],
      imgDialog: {
        isShow: false,
        imgUrl: '',
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getGoods();
      this.getImgList();
    },
    getGoods() {
      let {goods} = this.$route.params;
      this.goods = goods;
    },
    getImgList() {
      getImgList(this.goods.id)
      .then( imgList =>{
        this.imgList = imgList;
      })
    },
    deleteGoodsImg(img) {
      console.log(img);
      this.$confirm("此操作将永久删除该商品图片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        deleteGoodsImg(img.imgId)
        .then(resp => {
          this.$message({
            type: "success",
            message: "删除成功"
          });
          this.getImgList();
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
      
    },
    addGoodsImg() {
      if (this.imgDialog.imgUrl == '') {
        this.$message.error("请输入图片url");
        return;
      }
      let img = {
        url: this.imgDialog.imgUrl,
        goodsId: this.goods.id
      }
      addGoodsImg(img)
      .then( resp => {
        console.log(resp);
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.getImgList();
      })
      .catch( err => {
        console.log(err);
        this.$message.error("服务器炸了");
      })
      this.closeImgDiolog();
    },
    closeImgDiolog() {
      this.imgDialog.imgUrl = '';
      this.imgDialog.isShow = false;
    },
    openImgDiolog() {
      this.imgDialog.isShow = true;
    }
  }
}
</script>

<style>
.goods-img {
  width: 10rem;
  height: 10rem;
}
</style>
