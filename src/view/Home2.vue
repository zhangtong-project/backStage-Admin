<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="tableData"  style="width: 100%">
        <el-table-column  prop="reg_time" label="创建时间" >
        </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="yesapi_reg_source" label="来源">
        </el-table-column>
        <el-table-column prop="role_desc" label="级别"> </el-table-column>
        <el-table-column prop="yesapi_sex" label="性别" width="220">
        </el-table-column>
        <el-table-column prop="yesapi_email" label="邮箱" > </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[8, 10, 20, 50]"
        :page-size="8"
        :pager-count="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {listMenu} from '@/api/home2.js'
export default {
  name: "Home2",
  data() {
    return {
      tableData: [
          // {date: '2016-05-02',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1518 弄',zip: 200333},
          // {date: '2016-05-04',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1517 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
          // {date: '2016-05-01',name: '王小虎',province: '上海',city: '普陀区',address: '上海市普陀区金沙江路 1519 弄',zip: 200333},
      ],
      currentPage:1,
      formInline: {
          user: '',
          region: ''
      },
      dialogVisible: false
    }
  },
  created(){
    this.listMenu()
  },
  methods: {
    listMenu(){
      //  listMenu().then(res => {
      //    if(res.data.users){
      //      this.tableData=res.data.users;
      //    }
      //    console.log(this.tableData)
      // });
    },
    handleClick(row) {
      this.dialogVisible=true;
      console.log(row);
    },
    onSubmit() {
      console.log('submit!');
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
};
</script>

<style lang="less" scoped>
.el-form--inline .el-form-item{
  float: left;
  .el-button{
    border: none;
  }
}
.el-table{
  /deep/ th{
    background: #f8f8f9 !important;
  }
  /deep/ td{
    padding: .08rem 0;
  }
  /deep/ .cell{
    text-align: center;
    font-size: .14rem;
    .el-button{
      display: inline-block !important;
      span{
        font-size: .14rem;
      }
    }
  }
}
</style>

