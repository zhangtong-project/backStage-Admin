<template>
  <div>
      
      <span class="iconspan">
        <i :class="this.isCollapse == false ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="handleCollapse"></i>
      </span>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="active.path" v-if="active" >{{active.label}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown>
          <span class="el-dropdown-link rightImg">
            <img src="../../static/title.jpeg" alt=""><i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

    
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Home",
  props:{
    routerKey:{
      type: Boolean
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.breakTab.isCollapse
    },
    ...mapState({
        active: state => state.breakTab.activeIndexList
    }),
  },
  data() {
    return {
      breadList: [],
    };
  },
  created() {
  },
  methods: {
     handleCollapse(){
       this.$store.commit("handleCollapse")
     },
     loginOut(){
      this.$confirm('确定退出吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("退出登录")
          sessionStorage.clear();
          this.$store.state.breakTab.activeIndexList=null;
          this.$store.state.breakTab.tabsList=[{
                path: '/index',
                name: 'index',
                label: '首页',
                icon: 's-home',
                url: 'Home1'
            }];
          this.$router.push("/Login")
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          // setTimeout(() => {
          //   location.reload() // 强制刷新
          //   console.log("刷新")
          // }, 0)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     }
  },

  
};
</script>

<style lang="less" scoped>
.iconspan {
  float: left;
  i{
    font-size: .22rem;
    line-height: .5rem;
    margin-right: .3rem;
    cursor: pointer;
  }
}
.el-dropdown{
  position: absolute;
  right: .6rem;
  .rightImg{
    position: relative;
    img{
      width: .4rem;
      height: .4rem;
      cursor: pointer;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    i{
      position: relative;
      left: .38rem;
      top: .16rem;
    }
  }
}

.el-breadcrumb{
  float: left;
  .el-breadcrumb__item{
    /deep/ .el-breadcrumb__inner{
      font-size: .14rem;
      line-height: .5rem;
      cursor: pointer;
    }
  }
}
.el-dropdown-menu{
  padding: 0;
  margin: 0;
}
</style>

