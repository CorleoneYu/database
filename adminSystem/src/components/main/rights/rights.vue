<template>
  <div class="rights">
    <el-dialog title="设置管理员权限" :visible.sync="setRightsDialog.isShow">
      <div>
        <el-checkbox-group v-model="setRightsDialog.checkedRights">
          <el-checkbox v-for="rights in RIGHTS_MAP" :key="rights.id" :label="rights.id">
            {{rights.title}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSetRightsDialog">取 消</el-button>
        <el-button type="primary" @click="setRights">设置权限</el-button>
      </span>
    </el-dialog>

    <el-card>
      <div slot="header" class="card-header">
        <span>管理员列表</span>
      </div>
      <el-table :data="adminList" stripe>
        <el-table-column prop="id" label="管理员id"></el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column label="权限" width="400">
          <template slot-scope="scope">
            <el-tag class="mr10" v-for="rights in scope.row.rights" :key="rights">
              {{RIGHTS_MAP[rights-1].title}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="openSetRightsDialog(scope.row)" type="text" size="small">设置权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { 
  getAdminList, setRights
} from "api/admin";
export default {
  data() {
    return {
      RIGHTS_MAP: [{
          id: 1,
          title: '商品管理'
        },{
          id: 2,
          title: '订单管理'
        },{
          id: 3,
          title: '客户管理'
        },{
          id: 4,
          title: '权限管理'
        }
      ],
      adminList: [],
      newAdmin: null,
      setRightsDialog: {
        isShow: false,
        adminId: -1,
        checkedRights: [],
        rights: "",
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getAdminList();
    },
    getAdminList() {
      getAdminList()
      .then( adminList => {
        this.adminList = adminList;
        this.adminList.forEach( admin => {
          admin.rights = this._formatRights(admin.rights);
        })
        console.log(adminList);
      })
    },
    //将 形如 "1234" 转成 [1,2,3,4](升序排序)
    _formatRights(rights) {
      rights = rights.split('');
      rights.sort( (a, b)=>{
        return a - b;
      })
      return rights;
    },
    closeSetRightsDialog(admin) {
      this.setRightsDialog.adminId = -1;
      this.setRightsDialog.checkedRights = [];
      this.setRightsDialog.isShow = false;
    },
    openSetRightsDialog(admin) {
      this.setRightsDialog.adminId = admin.id;
      this.setRightsDialog.isShow = true;
    },
    setRights() {
      let checkedRights = this.setRightsDialog.checkedRights;
      checkedRights.sort( (a, b)=>{
        return a - b;
      })
      let rights = checkedRights.join('');
      this.setRightsDialog.rights = rights;

      setRights(this.setRightsDialog.adminId, rights)
      .then( resp => {
        console.log(resp);
        this.$message({
          type: "success",
          message: "设置成功!"
        });
        this.getAdminList();
        this.closeSetRightsDialog();
      })

    },
  }
}
</script>

<style>

</style>
