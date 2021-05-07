<template>
  <div>
    <div class="conten_top">
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="userSearch" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" id="search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reast()" id="reast">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="butBox">
      <el-button type="primary" @click="handAdd"><i class="el-icon-plus"></i>新增</el-button>
      <el-button type="danger" @click="handBatchDel"><i class="el-icon-delete"></i>批量删除</el-button>
    </div>
    <div>
      <el-table :data="tableData"  style="width: 100%" @select-all="selectionChange" @select="selectTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="userName" label="用户名"> </el-table-column>
        <el-table-column  prop="createTime" label="创建时间" :formatter="formatTime">
        </el-table-column>
        <el-table-column prop="id" label="用户id" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="email" label="邮箱" show-overflow-tooltip> </el-table-column>
        <el-table-column  label="操作" >
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.row)" type="success" size="small">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)" id="del">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageIndex"
        :page-sizes="[6, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <!-- 弹出框 -->
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="35%"
        :before-close="closeDialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="ruleForm.userName"></el-input>
            </el-form-item> 
            <el-form-item label="创建时间"  prop="createTime" required>
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.createTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="用户id" prop="id">
                <el-input v-model="ruleForm.id"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item class="butItem">
                    <el-button @click="handleClose('ruleForm')">取 消</el-button>
                    <el-button type="primary" @click="handleClick('ruleForm')">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    

  </div>
</template>

<script>
import {getUserList,addUserList,deleteRole,batchDelete,updateRole} from '@/api/login.js'
export default {
  name: "userList",
  data() {
    return {
      userSearch:'',
      tableData: [],
      pageIndex:1,
      pageSize:6,
      total:10,
      dialogVisible:false,
      title:"",
      ruleForm: {
          userName: '',
          createTime: '',
          id:'',
          address:'',
          email:''
      },
      rules: {
          userName: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          date: [
              { required: true, message: '请选择日期', trigger: 'change' },
              { type: 'date', message: '请选择日期',}
          ],
          id: [
              { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          address: [
              { required: true, message: '请输入地址', trigger: 'blur' },
          ],
          email: [
              { required: true, message: '请输入邮箱地址', trigger: 'blur' },
              { type: 'email', message: '请输入正确的邮箱地址'}
          ],
      },
      rowIds:[]
    }
  },
  created(){
    this.getList()
  },
  methods: {
    getList(){
        let params={
            pageIndex:this.pageIndex,
            pageSize:this.pageSize,
            name:this.userSearch
        }
        getUserList(params).then(res => {
         this.tableData=res.data.rows;
         this.total=res.data.total;
         console.log(res)
      });
    },
    //每页显示多少条
    handleSizeChange(size) {
        this.pageSize = size;
        this.getList();
    },
    //当前第几页
    handleCurrentChange(index) {
        this.pageIndex = index;
        this.getList();
    },
    //新增
    handAdd(){
        this.dialogVisible=true;
        this.title = '新增用户';
    },
    //关闭弹窗
    handleClose(ruleForm){
      this.$refs[ruleForm].resetFields();
      this.dialogVisible=false;
      this.getList();
    },
    closeDialog(){
      this.ruleForm={
          userName: '',
          date: '',
          id:'',
          address:'',
          email:''
      }
      this.dialogVisible=false;
      this.getList();
    },
    //弹窗提交--新增
    handleClick(ruleForm){
        this.$refs[ruleForm].validate((valid) => {
            if (valid) {
                if( this.title == "新增用户"){
                    addUserList(this.ruleForm).then(res =>{
                      console.log(res)
                      if(res.code == "200"){
                          this.$message({
                              message: res.data.message,
                              type: 'success'
                          })
                          this.handleClose(ruleForm);
                      }
                  })
                }else{
                  updateRole(this.ruleForm).then( res => {
                     if(res.code == "200"){
                          this.$message({
                              message: res.data.message,
                              type: 'success'
                          })
                          this.handleClose(ruleForm);
                      }
                  })
                }  
                

                
            }
        });
    },
    //修改用户
    handleUpdate(row){
      this.dialogVisible=true;
      this.title = '修改用户';
      this.ruleForm = row;
      console.log(row)
    },
    //删除
    handleDelete(row){
      document.getElementById("del").blur();
      this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
      })
      .then(() => {
          let idObj = { id: row.id }
          deleteRole(idObj).then(res => {
            if(res.code == "200"){
              this.$message({
                  message:res.data.message,
                  type: 'success'
              })
              this.getList();
            }
              
          })
      })
      .catch(() => {})
    },
    //多选
    selectionChange(val){
      console.log("quanxuan")
      if(val != ""){
        val.forEach((item) => {
            this.rowIds.push(item.id);
        });
      }else{
        this.rowIds=[];
      }
    },
    //单选触发
    selectTable(val,row){
     if (this.rowIds.includes(row.id)) {
        this.rowIds.splice(this.rowIds.indexOf(row.id), 1)
      } else {
        this.rowIds.push(row.id)
      }
    },
    //批量删除
    handBatchDel(){
      this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
      })
      .then(() => {
          let ids=[...new Set(this.rowIds)];
          let idsObj={
            ids:ids
          }
          batchDelete(idsObj).then( res => {
              if(res.code == "200") {
                this.$message({
                  message:res.data.message,
                  type:'success'
                })
                this.getList();
              }
          })
      })
      .catch(() => {})
    },
    //搜索
    onSearch() {
      document.getElementById("search").blur();
      this.getList();
    },
    //重置
    reast(){
      document.getElementById("reast").blur();
      this.userSearch= "";
    },
    //时间格式转换
    formatTime(row,column){
      let date= new Date(row.createTime);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      let D = date.getDate() < 10 ? '0'+(date.getDate()) + ' ': date.getDate() + ' ';
      // let h = date.getHours() < 10 ? '0'+(date.getHours()) + ':': date.getHours() + ':';
      // let m = date.getMinutes() < 10 ? '0'+(date.getMinutes()) + ':': date.getMinutes() + ':';
      // let s = date.getSeconds() < 10 ? '0'+(date.getSeconds()): date.getSeconds();
      return Y+M+D;
    }
  },
};
</script>

<style lang="less" scoped>
//搜索框
.conten_top{
  height: .66rem;
  .el-form--inline .el-form-item{
    float: left;
    /deep/.el-input__inner{
      height: .32rem;
      line-height: .32rem;
    }
    /deep/ .el-button{
      span{
        font-size: .14rem !important;
      } 
    }
  }
}
//增删
.butBox{
  text-align: left;
  /deep/.el-button{
    padding: 8px 16px !important;
    span,i{
      font-size: .12rem !important;
    }
  }
  
}
.conten_top,.butBox,.el-table{
  .el-button{
    border: none;
    font-size: .14rem;
    padding: 8px 16px !important;
    i{
      margin-right: .04rem;
    }
  }
}
//表格
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
      padding: 4px 14px !important;
      span{
        font-size: .12rem;
      }
    }
  }
}
//弹窗
.el-dialog{
  .el-dialog__body{
    .el-form{
      /deep/.el-form-item__content{
          width: 60%;
      }
      .butItem{
          margin-bottom: 0 !important;
          /deep/.el-form-item__content{
              float: right;
              text-align: right;
          }
      }
    }
  }
  
}
</style>

