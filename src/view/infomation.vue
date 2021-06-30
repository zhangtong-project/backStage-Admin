<template>
  <div class="info">
    <div class="headImg">
      <img :src="imageUrl" @click="handlePicture" class="image"/>
      <span  @click.stop="uploadImg">{{imgText=this.imageUrl==""?"上传头像":"修改头像"}}</span>
      <input type="file" accept="image/*" @change="handlePic" class="hiddenInput"/>
      <el-dialog :visible.sync="dialogVisible" width="30%">
        <img width="100%" :src="imageUrl" alt="">
      </el-dialog>
   </div>
    <div class="infoBox">
      <p><label>姓名:</label><span>{{infoObj.userName}}</span></p>
      <p><label>职位:</label><span>{{infoObj.roleName}}</span></p>
      <p><label>邮箱:</label><span>{{infoObj.email}}</span></p>
      <p><label>工作:</label><span>{{infoObj.work}}</span></p>
      <p><label>工作年限:</label><span>{{infoObj.workYear}}年</span></p>
      <div class="fileBox">
        <label>上传附件:</label>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".pdf"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError">
          <el-button  size="small" type="danger">{{fileBtnText= this.file ==""?"选择文件":"更换文件"}}</el-button>
        </el-upload>
        <span style="font-size:.12rem;color:red;">(仅限pdf)</span>
        <span class="fname" @click="viewfile">{{fileName}}</span>
      </div>
        
    </div>
  </div>
</template>

<script>
import {getUserInfo} from '@/api/login.js'
export default {
  name: "infomation",
  data() {
    return {
      imgText:"",
      imageUrl:"../../static/title.jpeg",
      infoObj:{
        email: "",
        roleName: "",
        userName: "",
        work: "",
        workYear: ""
      },
      dialogVisible: false,
      file:"",
      fileName:'',
      fileBtnText:""
    }
  },
  created(){
    this.getInfo();
  },
  methods: {
    uploadImg(){
      document.querySelector('.hiddenInput').click()
    },
    // 将头像显示
    handlePic(e) {
      console.log(e)
      let $target = e.target || e.srcElement
      let pic = $target.files[0]
      var reader = new FileReader()
      reader.onload = (data) => {
        let res = data.target || data.srcElement
        this.imageUrl = res.result
      }
      reader.readAsDataURL(pic)
    },
    //照片预览与上传
    handlePicture(){
      if(this.imageUrl){
        this.dialogVisible=true;
      }else{
        this.uploadImg();
      }
      
    },
    // 上传文件之前的钩子
    beforeUpload(file){
        this.file=file;
        var size = file.size / 1024 / 1024
        let extension = file.name.split('.').slice(-1) == 'pdf'
        if (!extension) {
          this.$message.warning('上传模板只能是pdf格式!')
          return
        }
        if(size > 10) {
          console.log(111)
          this.$message({
            type: 'warning',
            message: `文件大小不得超过10M`
          });
          return false;
        }else{
          this.fileName =file.name;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          let that = this;
          reader.onload = function() {
            that.fileData = reader.result;
          };
          return; // 返回false不会自动上传
        }
        
      },
      //预览pdf
      viewfile(){
        console.log("viewFile");
        window.open().document.write(
          '<body style="margin:0px;"><object data="' +
          this.fileData +
          '" type="application/pdf" width="100%" height="100%"><iframe src="' +
          this.fileData +
          '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></object></body>'
        );
        // window.open().document.write(
        //   '<body style="margin:0px;"><iframe src="' +
        //     this.fileData +
        //     '" scrolling="no" width="100%" height="100%" frameborder="0" ></iframe></body>'
        // );
      },
    // 文件上传成功时的钩子
    handleSuccess(res, file) {
      this.$message({
        type: 'success',
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file) {
      this.$message({
        type: 'error',
        message: `文件上传失败`
      });
    },
    //获取个人信息
    getInfo(){
      let roleId=sessionStorage.getItem("roleId")
      let roleIdObj={
          roleId:roleId
      }
      getUserInfo(roleIdObj).then(res => {
          this.infoObj=res.data.userList;
      })
    }
    
  },
};
</script>

<style lang="less" scoped>
.headImg{
  .image{
    width: 0.8rem;
    height: 0.8rem;
    display: block;
    margin: 0 auto;
    border-radius:50% ;
    cursor: pointer;
  }
  span{
    cursor: pointer;
    font-size: .14rem;
    color: #409eff;
  }
}
.hiddenInput{
  display: none;
}
.caption {
  color: #8F8F8F;
  font-size: 26px;
  height: 37px;
}
.info{
  width: 3.4rem;
  height: auto;
  border: 1px dashed #d9d9d9;
  border-radius: .05rem;
  padding: .1rem .1rem .3rem;
}
.infoBox{
  p{
    text-align: left;
  }
  label{
    width: 1rem;
    display: inline-block;
    text-align: right;
    margin: .2rem .2rem .2rem 0;
    font-size: .14rem;
  }
  span{
    font-size: .14rem;
  }
  .fileBox{
    text-align: left;
    .upload-demo{
      display: inline-block;
      /deep/.el-button span{
        font-size: .14rem;
      }
    }
    .fname{
      display: inline-block;
      width: 100%;
      text-align: center;
      cursor: pointer;
      color: #409eff;
    }
  }
}
</style>

