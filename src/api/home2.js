import request from '@/api/request'
// 查询菜单列表
export function listMenu(params) {
    return request({
      url: '/?s=App.User.GetList&return_data=0&page=1&perpage=20&app_key=0EF7732EC206297F098694CFAC89CCD6&sign=6D2C3B5E1C4338D1D4DA01427148AC98m/menu/list',
      method: 'get',
      params: params
    })
}