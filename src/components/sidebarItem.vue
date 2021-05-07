<template>
    <div>
      <el-menu-item v-if="!item.children" :key="item.path" :index="item.path" @click="handleClick(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu v-if="item.children&&item.children.length>0" :index="item.label"  :key="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="chidItem.path" v-for="(chidItem, chidItemIndex) in item.children" :key="chidItemIndex" @click="handleClick(chidItem)">
            <i :class="'el-icon-' + chidItem.icon"></i>
            <span slot="title">{{ chidItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </div>
</template>
<script>
export default {
    name:"sidebaiItem",
    props: {
    item: {
      type: Object,
      required: true
    },
  },
  data(){
    return{

    }
  },
  created(){
    var itemPath=JSON.parse(sessionStorage.getItem("currentPath"));
    if(itemPath!=null){
      this.$store.commit('navList', itemPath)
    } 
    
  },
  methods: {
    handleClick(item) {
      sessionStorage.clear();
      sessionStorage.setItem("currentPath", JSON.stringify(item));
      this.$store.commit('navList', item)
      this.$router.push({ name: item.name })
    }

  },
}
</script>
<style lang="less" scoped>
.el-menu-item.is-active {
    background-color: rgb(67, 74, 80) !important;
}
</style>
