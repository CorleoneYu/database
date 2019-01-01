<template>
  <div class="user-detail">
    <el-card>
      <div slot="header" class="card-header">
        <span>用户详细信息</span>
      </div>
      <div class="lh200">
        <p><span class="fstrong mr10">用户id:</span> <span>{{user.userId}}</span></p>
        <p><span class="fstrong mr10">用户名:</span> <span>{{user.name}}</span></p>
        <p><span class="fstrong mr10">用户账号:</span> <span>{{user.account}}</span></p>
      </div>
      <el-table :data="addressList" stripe>
        <el-table-column prop="addressId" label="地址id"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="detail" label="详细地址"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { 
  getAddressListByUserId
} from "api/user";
export default {
  data() {
    return {
      addressList: [],
      user: null
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getUser();
      this.getAddressList();
    },
    getUser() {
      let {user} = this.$route.params;
      this.user = user;
    },
    getAddressList() {
      console.log(this.user);
      getAddressListByUserId(this.user.userId)
      .then(addressList=>{
        console.log(addressList);
        this.addressList = addressList;
      })
    }
  }
}
</script>

<style>

</style>
