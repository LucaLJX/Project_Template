import axios from 'axios'
import Qs from 'qs'

const baseURL = 'http://localhost:8080'
const TIME_OUT = 10000 // 超时时间

const instance = axios.create({
  baseURL,
  timeout: TIME_OUT
})

// 请求前拦截
instance.interceptors.request.use(
  (config) => {
    // 请求超时时间
    const conf = config
    conf.timeout = TIME_OUT
    return conf
  },
  (err) => {
    console.log('请求超时')
    return Promise.reject(err)
  }
)

// 返回后拦截
instance.interceptors.response.use(
  response => {
    // 响应拦截
    // 不是系统接口直接返回response
    if (response.data.code === undefined) return response
    if (response.data.code !== 0) {
      console.log(response.data.msg)
      // message.error(response.data.msg)
    }
    if (response.data.code === 18) {
      window.location.replace('/login')
    }
    return response
  },
  err => {
    // if (err.response.status === 504 || err.response.status === 404) {
    //   console.log('服务器被吃了⊙﹏⊙∥')
    // } else if (err.response.status === 401) {
    //   console.log('登录信息失效⊙﹏⊙∥')
    // } else if (err.response.status === 500) {
    //   console.log('服务器开小差了⊙﹏⊙∥')
    // }
    // message.error(err.message)
    console.log(err.message)
    return Promise.reject(err)
  }
)

export default class Http {
  /**
   * get 请求
   * @param {*} url
   * @param {*} params
   */
  static get (url, params) {
    return instance({
      method: 'get',
      headers: {
        // token: window.localStorage.getItem('token')
      },
      url: `${baseURL}}${url}`,
      params
    })
  }

  /**
   * post body 请求
   * @param {*} url
   * @param {*} params
   */
  static post (url, params) {
    return instance({
      method: 'post',
      url: `${baseURL}${url}`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        charset: 'utf-8',
        token: window.localStorage.getItem('token')
      }
    })
  }

  /**
   * post params 请求
   * @param {*} url
   * @param {*} params
   * @param {*} type
   */
  static postParam (url, params, type = 'data') {
    return instance({
      method: 'post',
      url: `${baseURL}${url}`,
      data: type === 'data' ? params : null,
      params: type === 'params' ? params : null,
      paramsSerializer: query => {
        return Qs.stringify(query, { arrayFormat: 'brackets' })
      },
      transformRequest: [
        data => {
          return Qs.stringify(data)
        }
      ],
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: window.localStorage.getItem('token')
      }
    })
  }

  /**
   * 上传文件
   * @param {*} url
   * @param {*} data
   */
  static upload (url, data) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      formData.append(key, data[key])
    })
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
