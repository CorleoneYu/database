<template>
  <div id="main">
    <el-container class="page">
      <el-header >
        <h2>电商管理系统</h2>
        <el-dropdown class="r cwhite" @command="quit">
          <span class="el-dropdown-link">
            用户：{{account}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu>
            <el-menu-item index="1" v-if="rights[0] == 1">
              <router-link :to="{ name: 'goods' }" tag="div">
                <i class="el-icon-edit-outline"></i>商品管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="3" v-if="rights[1] == 1">
              <router-link :to="{ name: 'order'}" tag="div">
                <i class="el-icon-document"></i>订单管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="6" v-if="rights[2] == 1">
              <router-link :to="{ name: 'user'}" tag="div">
                <i class="el-icon-edit"></i>客户管理
              </router-link>
            </el-menu-item>
            <el-menu-item index="7" v-if="rights[3] == 1">
              <router-link :to="{ name: 'rights'}" tag="div">
                <i class="el-icon-setting"></i>权限管理
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { loadAccount, loadRights, clearAccount, clearRights } from 'common/js/cache'
// import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      account: '',
      rights: 0
    }
  },
  created() {
    this.account = loadAccount();
    this.rights = loadRights();
    console.log(this.rights);
  },
  methods: {
    quit() {
      console.log('quit');
      this.$message({
          message: '注销登录',
          type: 'success'
      });
      clearAccount();
      clearRights();
      
      setTimeout(() => {
        this.$router.replace({ 
          path: '/login',
          query: { } 
        });
      }, 500);
    }
  },
}
</script>

<style>
.page {
  box-sizing: border-box;
  height: 100vh;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.input-item {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
}
.input-item > span {
  margin-right: 1.5rem;
  width: 6rem;
  text-align: right;
}
</style>
