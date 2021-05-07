import Mock from 'mockjs'
import loginApi from './login'
// 设置全局延时 没有延时的话有时候会检测不到数据变化 建议保留
Mock.setup({
    timeout: '300-600'
})
Mock.mock(/\/user\/login/, 'post', loginApi.loginUser);
Mock.mock(/\/user\/getUserList/, 'get', loginApi.getUserList);
Mock.mock(/\/user\/addUserList/, 'post', loginApi.addUserList);
Mock.mock(/\/user\/deleteRole/, 'post', loginApi.deleteRole);
Mock.mock(/\/user\/batchDelete/, 'post', loginApi.batchDelete);
Mock.mock(/\/user\/updateRole/, 'post', loginApi.updateRole);