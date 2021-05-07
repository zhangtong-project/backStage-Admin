import axios from 'axios'
// var baseUrl = "http://hn216.api.yesapi.cn"
//创建服务
const service = axios.create({
    timeout: 5000,  // request timeout
    baseURL: process.env.BASE_API, // url = base url + request url
    headers: {
        'Content-type': 'application/json'
    },
});
// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token')
        if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.authorization = token  //请求头加上token
        }
        return config
    },
    err => {
        return Promise.reject(err)
});
//响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    //接口错误状态处理，也就是说无响应时的处理
    error => {
        return Promise.reject(error) // 返回接口返回的错误信息
});
export default service;