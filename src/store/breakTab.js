export default {

    //存储数据
    state: {
        isCollapse: false,
        activeIndexList: null,
        tabsList: [
            {
                path: '/index',
                name: 'index',
                label: '首页',
                icon: 's-home',
                url: 'index'
            }
        ]
    },
    //调用方法
    mutations: {
        handleCollapse(state) {
            state.isCollapse = !state.isCollapse
        },
        //选择标签 选择面包屑
        navList(state, val) {
            if (val.name === 'index') {
                state.activeIndexList = null
            } else {
                state.activeIndexList = val
                let res = state.tabsList.findIndex(item => item.name === val.name)
                res === -1 ? state.tabsList.push(val) : ''

            }
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
        },
        //关闭标签
        closeTag(state, val) {
            let res = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(res, 1)
        },
    },
    actions: {}
}
