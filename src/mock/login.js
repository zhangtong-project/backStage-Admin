import Mock from 'mockjs'

const Random = Mock.Random; // Mock.Random 是一个工具类，用于生成各种随机数据
let list = []; // 用于接受生成数据的数组
const count=30;
   
for (let i = 0; i < count; i++) {
  const template={
    id:Random.guid(),
    userName:Random.cname(),
    email:Random.email(),
    createTime:Random.datetime(),
    address: Random.province()
  }
  list.push(template)
}

export default{
  //登录
    loginUser: config => {
      const data = JSON.parse(config.body);
      let userList = {};
      if(data.userName === 'admin' && data.passWord === "123456"){
          userList = {
            userName:'admin',
            roleName:'管理员',
            roleId:"admin"
          }
      }else if(data.userName === 'sub' && data.passWord === "123456"){
          userList = {
            userName:'sub',
            roleName:'下属',
            roleId:"sub"
          }
      }else{
          return {
            code: -1,
            data: {
              msg: "用户名或密码错误",
              status:'fail'
            }
        }
        
      }
      return {
        code: 200,
        data: {
          userList: userList
        }
      }
    },
    // 获取登录用户信息
    getUserInfo:config => {
      let data = JSON.parse(config.body);
      let userList = {};
      console.log(data,"admin")
      if(data.roleId === 'admin'){
          userList = {
            userName:'admin',
            roleName:'管理员',
            roleId:"admim",
            email:Random.email(),
            img:Random.image('100x100'),
            token:Mock.mock(/[a-z]{2}[A-Z]{2}[0-9][a-z]{2}[A-Z]{2}[0-9][a-z]{2}[A-Z]{2}[0-9]{2}/),
            work:Random.pick(["医生","飞行员","程序员"],1),
            workYear:Random.integer(1,5)
          }
      }else if(data.roleId === 'sub'){
          userList = {
            userName:'sub',
            roleName:'下属',
            roleId:"sub",
            email:Random.email(),
            img:Random.image('100x100'),
            token:Mock.mock(/[a-z]{2}[A-Z]{2}[0-9][a-z]{2}[A-Z]{2}[0-9][a-z]{2}[A-Z]{2}[0-9]{2}/),
            work:Random.pick(["医生","飞行员","程序员"],1),
            workYear:Random.integer(1,5)
          }
      }else{
          userList = {}
      }
      return {
        code: 200,
        data: {
          userList: userList
        }
      }
    },
    //获取用户列表
    getUserList:config => {
      //pageIndex 当前页 pageSize 每页多少条
      const { name,pageIndex , pageSize } = JSON.parse(config.body);
      if(name !== ""){
        const userList = list.filter(item => item.userName.indexOf(name) != -1)
        return {
          'code': 200,
          'message': 'success',
          'data': {
              'rows': userList,
              'total': userList.length
          }
        }   
      }
      else{
        //取满足index的list
        const userList = list.filter((item, index) => index < pageSize * pageIndex && index >= pageSize * (pageIndex - 1));   
        return {
          'code': 200,
          'message': 'success',
          'data': {
              'rows': userList,
              'total': list.length
          }
        }
      }
    },
    //新增用户
    addUserList:config =>{
      const { userName,createTime,id,address,email } = JSON.parse(config.body);
      list.unshift({
        id:id,
        userName:userName,
        email:email,
        createTime:createTime,
        address: address
      })
      return {
        code: 200,
        data: {
          message: '添加成功'
        }
      }
    },
    //删除用户
    deleteRole:config =>{
      const { id } = JSON.parse(config.body);
      console.log(id)
      if (id == "") {
        return {
          code: -999,
          message: '参数不正确'
        }
      } else {
        let index=list.findIndex(item => item.id==id);
        list.splice(index,1);
        return {
          code: 200,
          data: {
            message: '删除成功'
          }
        }
      }
    },
    //批量删除
    batchDelete:config => {
      let { ids } = JSON.parse(config.body)
      console.log(ids);
      ids = ids.join(",")
      if (ids == "") {
        return {
          code: -999,
          message: '参数不正确'
        }
      } else {
        list=list.filter(i => !ids.includes(i.id));
        return {
          code: 200,
          data: {
            message: '批量删除成功'
          }
        }
      }
      
    },
    //修改用户
    updateRole:config => {
      const { userName,createTime,id,address,email } = JSON.parse(config.body);
      list.some(i => {
        if (i.id === id) {
          i.id = id,
          i.userName = userName,
          i.email = email,
          i.createTime = createTime,
          i.address = address
          return true
        }
      })
      return {
        code: 200,
        data: {
          message: '编辑成功'
        }
      }
    }
}