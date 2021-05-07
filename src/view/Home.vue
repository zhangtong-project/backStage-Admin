<template>
<div>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
        <sidebar />
      </el-aside>
      <el-container>
        <!-- 面包屑 -->
        <el-header>
          <breckTab />
        </el-header>
        <!-- tag标签 -->
        <tagsTab/>
        <!-- content -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</div>
  
</template>

<script>
import sidebar from "@/components/sidebar.vue"
import breckTab from "@/components/breckTab.vue"
import tagsTab from "@/components/tagsTab.vue"
export default {
  name:"Home",
  components:{
    sidebar,
    breckTab,
    tagsTab
  },
  data() {
    return {
    }
  },
  mounted () {
    if (window.history && window.history.pushState) {
        // 向历史记录中插入了当前页
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.goBack, false);
    }
    },
    destroyed () {
        window.removeEventListener('popstate', this.goBack, false);
    },
    methods: {
        goBack () {
            // console.log("点击了浏览器的返回按钮");
            history.pushState(null, null, document.URL);
        },
    } 
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
  .el-aside{
    overflow: hidden !important;
  }
  .el-aside>div{
     height: 100%;
  }
}
.el-header{
  height: .5rem  !important;
  text-align: center;
  line-height: .5rem;
  position: relative;
}
</style>

