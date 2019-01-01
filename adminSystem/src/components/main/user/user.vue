<template>
  <div class="user">
    <el-card>
      <div slot="header" class="card-header">
        <span>用户列表</span>
      </div>
      <el-table :data="user.list" stripe>
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="toUserDetail(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card class="mt20">
      <div slot="header" class="card-header">
        <span>增加新用户</span>
        <el-button class="mt20" type="primary" @click="addUser">确定</el-button>
      </div>
      <div class="w400">
        <div class="input-item">
          <span>账号</span>
          <el-input v-model="user.newUser.account"></el-input>
        </div>
        <div class="input-item">
          <span>密码</span>
          <el-input v-model="user.newUser.password"></el-input>
        </div>
        <div class="input-item">
          <span>用户名</span>
          <el-input v-model="user.newUser.name"></el-input>
        </div>
      </div>
    </el-card>
    
  </div>
</template>

<script>
import { 
  getUserList, deleteUser, addUser
} from "api/user";
export default {
  data() {
    return {
      user: {
        list: [],
        search: "",
        newUser: {
          account: 'lin11',
          password: '123456',
          name: '林11'
        }
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getUserList();
    },
    getUserList() {
      getUserList().then(userList => {
        console.log(userList);
        this.user.list = userList;
      });
    },
    deleteUser(user) {
      console.log(user);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(user.userId)
            .then(resp => {
              this.getUserList();
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
    addUser() {
      this.$confirm('请确定用户信息是否正确', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addUser(this.user.newUser)
          .then( resp=>{
            console.log(resp);
            this.getUserList();
            this.$message({
              type: "success",
              message: "添加成功!"
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    toUserDetail(user) {
      console.log(user);
      this.$router.push({
        name: 'userDetail',
        params: {
          user
        }
      })
    }
  }
};
</script>

<style>

</style>
