<template>
  <div class="tabs">
    <el-tag
      :key="item.name"
      size="small"
      v-for="(item, index) in tagList"
      :closable="item.name !== 'Home1'"
      :disable-transitions="false"
      @close="handleClose(item, index)"
      @click="changeTag(item)"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      tagList: state => state.breakTab.tabsList
    })
  },
  created(){
    var itemPath=JSON.parse(sessionStorage.getItem("currentPath"));
    if(itemPath!=null){
      this.$store.commit('navList', itemPath)
    }  
  },
  methods: {
    ...mapMutations({
      close: 'closeTag'
    }),
    //关闭标签
    handleClose(item, index) {
      let length = this.tagList.length - 1
      this.close(item)
      if (item.name !== this.$route.name) {
        return
      }
      if (index === length) {
        this.$router.push({ name: this.tagList[index - 1].name })
        //关闭tag标签后  面包屑对应切换
        this.$store.state.breakTab.activeIndexList=this.tagList[index - 1]
      } else {
        this.$router.push({ name: this.tagList[index].name })
      }
    },
    changeTag(item) {
      sessionStorage.clear();
      sessionStorage.setItem("currentPath", JSON.stringify(item));
      this.$router.push({ name: item.name })
      this.$store.commit('navList', item)
    }
  }
}
</script>

<style lang="less" scoped>
.tabs {
  text-align: left;
  padding: .04rem .2rem;
  box-shadow: 0px 1px 6px #ccc inset;
  .el-tag {
    margin-right: .06rem;
    cursor: pointer;
  }
}
</style>
