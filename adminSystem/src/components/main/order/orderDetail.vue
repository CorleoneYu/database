<template>
  <div class="order-detail">
    <el-card>
      <div slot="header" class="card-header">
        <span>订单详细信息</span>
      </div>
      <div class="lh200">
        <p>
          <span class="fstrong mr10">订单状态:</span> 
          <span v-if="order.state == stateList.WAIT_PAY.id">待付款</span>
          <span v-if="order.state == stateList.WAIT_DELIEVRY.id">待发货</span>
          <span v-if="order.state == stateList.WAIT_GET.id">待收货</span>
          <span v-if="order.state == stateList.DONE.id">已完成</span>
        </p>
        <p><span class="fstrong mr10">用户名称:</span> <span>{{order.name}}</span></p>
        <p><span class="fstrong mr10">用户联系方式:</span> <span>{{order.phone}}</span></p>
        <p><span class="fstrong mr10">用户地址:</span> <span>{{order.detail}}</span></p>
      </div>
      <el-table :data="orderDetailList">
        <el-table-column prop="goods_id" label="商品id"></el-table-column>
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="num" label="购买数量"></el-table-column>
        <el-table-column prop="price" label="商品单价"></el-table-column>
      </el-table>

      <div class="order-desc mt20 lh200">
        <div class="desc-left">
          <p>订单编号：{{order.id}}</p>
          <p>下单时间：{{order.createTime}}</p>
        </div>
        <div class="desc-right tr">
          <p>商品金额 ：￥{{totalPrice}}</p>
          <p class="cred f20">实际付款 ：￥{{finalPrice}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
const STATE_MAP = {
  ALL: { id: 0, title: '全部'}, 
  WAIT_PAY: { id: 1, title: '待支付'}, 
  WAIT_DELIEVRY: { id: 2, title: '待发货'}, 
  WAIT_GET: { id: 3, title: '待收货'}, 
  DONE: { id: 4, title: '已完成'},
}
import { getOrderDetail } from 'api/order'
export default {
  data() {
    return {
      order: null,
      orderDetailList: [],
      stateList: STATE_MAP,
    }
  },
  created() {
    this.init();
  },
  computed: {
    totalPrice() {
      //商品金额 商品单价*购买数量 之和
      let total = 0;
      this.orderDetailList.forEach( (goods)=>{
        total += goods.price * goods.num;
      })
      return total;
    },
    finalPrice() {
      //实际付款 订单详情的sum 之和
      let final = 0;
      this.orderDetailList.forEach( (goods)=>{
        final += goods.sum;
      })
      return final;
    }
  },
  methods: {
    init() {
      this.getOrder();
      this.getOrderDetail();
    },
    getOrder() {
      let {order} = this.$route.params;
      this.order = order;
    },
    getOrderDetail() {
      getOrderDetail(this.order.id)
      .then(detailList =>{
        this.orderDetailList = detailList;
      })
    }
  }
}
</script>

<style>
.order-desc {
  display: flex;
  justify-content: space-between;
}
</style>
