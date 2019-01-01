<template>
  <div class="login">
    <div class="for">
      <p class="title tc">欢迎你</p>
      <input class="input mt20" placeholder="请输入用户名" type="text" v-model="account">
      <input class="input mt20" placeholder="请输入密码" type="password" 
      v-model="password" @keyup.enter="login">
      <button class="login-btn mt20 f16" @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import { setAccount, setRights } from 'common/js/cache'
import { getUser, login } from 'api/login'
export default {
  data() {
    return {
      account: '',
      password: '',
    }
  },
  methods: {
    login() {
      console.log('login');
     
      login(this.account, this.password)
      .then(resp => {
        console.log(resp);
         this.$message({
          message: '恭喜你，登陆成功',
          type: 'success'
        });
        setAccount(this.account);
        setRights(this.formateRigths(resp.rights));
        setTimeout(() => {
          this.$router.push({
            name: 'main'
          })
        }, 500);
      })
      .catch( err => {
        console.log(err);
         this.$message.error('请输入正确的账号、密码');
      })
    },
     //将权限1234 格式化成 1111
    //如 1 => 1000   34 => 0011
    formateRigths(rights) {
      let result = [0,0,0,0];

      rights = rights.split('');
      if (rights.length > 4) {
        rights.length = 4;
      }
      console.log(rights);
      rights.forEach( item => {
        result[item-1] = 1;
      })
      console.log(result);
      return result;
    },
  }
}
</script>

<style>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  color: white;
  background-image: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543943982270&di=b5ce85105506ed22799965d31b556c1b&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-vo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fd058ccbf6c81800acc536e1bb53533fa828b4775.jpg)
}
.input {
  box-sizing: border-box;
  padding-left: 30px;
  display: block;
  background: transparent;
  outline: none;
  height: 40px;
  line-height: 40px;
  width: 250px;
  border: 1px solid white;
  border-radius: 30px;
  color: white;
}
.login-btn {
  outline: none;
  border: none;
  height: 40px;
  line-height: 40px;
  width: 250px;
  border-radius: 30px;
  color: white;
  background: #409EFF;
  cursor: pointer;
}
</style>
