<template>
  <div class="order">
    <el-tabs v-model="activeState" @tab-click="changeState">
      <el-tab-pane v-for="state in stateList" :key="state.id"
      :label="state.title" :value="state.id"></el-tab-pane>
    </el-tabs>

    <el-card>
      <div slot="header" class="card-header">
        <span>订单列表</span>
        <el-input class="w200" placeholder="请输入用户名" v-model="userName">
          <template slot="append">
            <el-button slot="append" icon="el-icon-search" @click="getOrderList"></el-button>
          </template>
        </el-input>
      </div>
      <el-table :data="orderList" stripe>
        <el-table-column prop="id" label="订单id"></el-table-column>
        <el-table-column prop="name" label="用户名称"></el-table-column>
        <el-table-column prop="phone" label="用户联系方式"></el-table-column>
        <el-table-column prop="detail" label="收货地址"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
        <el-table-column label="订单状态">
          <template slot-scope="scope"> 
            <span v-if="scope.row.state == stateList.WAIT_PAY.id">待付款</span>
            <span v-if="scope.row.state == stateList.WAIT_DELIEVRY.id">待发货</span>
            <span v-if="scope.row.state == stateList.WAIT_GET.id">待收货</span>
            <span v-if="scope.row.state == stateList.DONE.id">已完成</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="toOrderDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="delivery(scope.row)" v-if="scope.row.state == 2"
            type="text" size="small">发货</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import { 
  getOrderList, delivery
} from "api/order";
export default {
  data() {
    return {
      orderList: [],
      activeState: STATE_MAP.ALL.id,
      stateList: STATE_MAP,
      userName: '', //用来搜索
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getOrderList();
    },
    getOrderList() {
      getOrderList(this.userName, this.activeState)
      .then( orderList => {
        console.log(orderList);
        this.orderList = orderList;
      })
    },
    changeState() {
      this.getOrderList();
    },
    toOrderDetail(order) {
      console.log(order);
      this.$router.push({
        name: 'orderDetail',
        params: {
          order
        }
      })
    },
    delivery(order) {
      delivery(order.id)
      .then(resp => {
        this.getOrderList();
      })
    }
  }
  
}
</script>

<style>

</style>
