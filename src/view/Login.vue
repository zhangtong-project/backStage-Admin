<template>

    <div id="loginsty">
      <div class="content">
         <div class="title">
             <p>Admin</p>
             <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入账号" clearable prefix-icon="el-icon-user" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="passWord">
                    <el-input placeholder="请输入密码" v-model="ruleForm.passWord"  prefix-icon="el-icon-lock" clearable @keyup.enter.native="loginBtn" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginBtn">登录</el-button>
                </el-form-item>
            </el-form>
         </div>
      </div>
    </div>
</template>

<script>
import {login} from '@/api/login.js'
export default{
    name:"Login",
    data(){
        var validateUser=(rule, value, callback) =>{
            if(value === ""){
                callback(new Error('请输入账号'));
            }else{
                callback();
            }
        }
        return{
            ruleForm: {
                userName:"admin",//sub下属
                passWord:"123456",
            },
            rules: {
                userName: [
                    {validator: validateUser, trigger: 'blur' }
                ],
                passWord: [
                    {required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },
    mounted(){
    },
    methods:{
        loginBtn(){
                let params={
                    userName:this.ruleForm.userName,
                    passWord:this.ruleForm.passWord
                }
                this.$refs.ruleForm.validate((valid) =>{
                    if(valid){
                        login(params).then(res => {
                            console.log(res)
                            if(res.code == 200){
                                this.$message({
                                    message: '登录成功',
                                    type: 'success'
                                });
                                this.$router.push("/");
                            }else{
                                this.$message({
                                    message: res.data.msg,
                                    type: 'error'
                                });
                            }
                            
                        });
                    }else{
                        return false;
                    }
                })
                
        }
    }
}
</script>
<style scoped lang="less">
#loginsty{
    background: url(../assets/img/back.jpeg)  no-repeat center fixed;
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    .content{
        width: 20%;
        padding: .5rem .8rem;
        border-radius: .05rem;
        box-shadow: 0rem .02rem .12rem 0rem rgb(105 105 105 / 7%);
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: mymove 1s ease-in-out;
        overflow: hidden;
        transition: 1.5s;
        .title{
            p{
                font-size: 0.24rem;
                margin-bottom: .3rem;
            }
            /deep/ .el-form-item__content{
                margin-left: 0 !important;
            }
            .el-button{
                width: 100%;
            }
        }
    }
    @keyframes mymove {
        0% {
            width: 0px;
            height: 5px;
        }

        10% {
            width: 50px;
            height: 5px;
        }

        15% {
            width: 100px;
            height: 5px;
        }

        20% {
            width: 150px;
            height: 5px;
        }

        25% {
            width: 200px;
            height: 5px;
        }

        30% {
            width: 250px;
            height: 5px;
        }

        35% {
            width: 300px;
            height: 5px;
        }

        40% {
            width: 350px;
            height: 5px;
        }

        45% {
            width: 450px;
            height: 5px;
        }

        50% {
            width: 500px;
            height: 5px;
        }

        55% {
            height: 30px;
        }

        60% {
            height: 60px;
        }

        65% {
            height: 90px;
        }

        70% {
            height: 120px;
        }

        75% {
            height: 150px;
        }

        80% {
            height: 180px;
        }

        85% {
            height: 210px;
        }

        90% {
            height: 240px;
        }

        95% {
            height: 240px;
        }

        100% {
            height: 300px;
        }
    }
}
</style>
