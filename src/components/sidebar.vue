<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      router
      :collapse="isCollapse"
    >
      <h3 @click="handleIndex">Admin</h3>
       <sidebarItem  v-for="item in list" :key="item.path" :item="item" />
    </el-menu>
    
    
    
  </div>
</template>

<script>
import sidebarItem from "@/components/sidebarItem.vue"
export default {
  name: "sidebar",
  components:{
    sidebarItem
  },
  computed: {
    isCollapse() {
      return this.$store.state.breakTab.isCollapse
    },
  },
  data() {
    return {
       list: [
        {
          path: '/index',
          name: 'index',
          label: '首页',
          icon: 's-home',
          url: '/index'
        },
        {
          path: '/userList',
          name: 'userList',
          label: '用户管理',
          icon: 's-home',
          url: '/userList'
        },
        {
          label: '其他11',
          icon: 'location',
          children: [
            {
              path: '/Home2',
              name: 'Home2',
              label: '第二其他111',
              icon: 's-home',
              url: '/Home2'
            },
          ]
        },
        {
          label: '最后其他',
          icon: 'location',
          children: [
            {
              path: '/Home3',
              name: 'Home3',
              label: '第三',
              icon: 's-home',
              url: '/Home3'
            },
          ]
        },
      ]
    };
  },
  created() {
  },
  methods: {
    handleIndex(){
      let item={
                path: '/index',
                name: 'index',
                label: '首页',
                icon: 's-home',
                url: 'index'
            }
            
      this.$store.commit('navList', item)
      this.$router.push({ name: item.name })
    },

  },

  
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 2rem;
  min-height: 4rem;
}
.el-menu {
  border: none !important;
  height: 100%;
  h3 {
    color: #fff;
    line-height: 0.7rem;
    cursor: pointer;
  }
  /deep/ .el-menu-item-group__title {
    display: none !important;
  }
  /deep/  [class^=el-icon-]{
    margin-right: .16rem !important;
  }
  /deep/ .el-menu-item *,/deep/.el-submenu__title *{
    font-size: .14rem;
  }
  /deep/ li{
    text-align: left  !important;
  }
}
</style>

