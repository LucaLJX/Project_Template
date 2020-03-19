import axios from 'axios'
import Qs from 'qs'

const baseURL = ''
const TIME_OUT = 8000 // 超时时间
const CODE_KEY = 'error_code'

const instance = axios.create({
  baseURL,
  timeout: TIME_OUT
})

// 请求前拦截
instance.interceptors.request.use(
  config => {
    // 请求超时时间
    const conf = config
    conf.timeout = TIME_OUT
    return conf
  },
  err => {
    console.log('请求超时')
    return Promise.reject(err)
  }
)

// 返回后拦截
instance.interceptors.response.use(
  response => {
    // 响应拦截
    // 不是系统接口直接返回response
    if (response.data[CODE_KEY] === undefined) {
      return response
    }
    if (response.data[CODE_KEY] !== 0) {
      return Promise.reject(response)
      // message.error(response.data.msg)
    }
    if (response.data[CODE_KEY] === 18) {
      window.location.replace('/login')
      return Promise.reject(response)
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
    console.log('err')
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
  public static get<T> (url: string, params: T) {
    return instance({
      method: 'get',
      headers: {
        // token: window.localStorage.getItem('token')
      },
      url: `${baseURL}${url}`,
      params
    })
      .then(res => res.data)
  }

  /**
   * post body 请求
   * @param {*} url
   * @param {*} params
   */
  public static post<T> (url: string, params: T) {
    return instance({
      method: 'post',
      url: `${baseURL}${url}`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'charset': 'utf-8',
        'token': window.localStorage.getItem('token')
      }
    })
      .then(res => res.data)
  }

  /**
   * post params 请求
   * @param {*} url
   * @param {*} params
   * @param {*} type
   */
  public static postParam<T> (url: string, params: T, type = 'data') {
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
        'token': window.localStorage.getItem('token')
      }
    })
      .then(res => res.data)
  }

  /**
   * 上传文件
   * @param {*} url
   * @param {*} data
   */
  public static upload<T> (url: string, data: T) {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      // @ts-ignore
      formData.append(key, data[key])
    })
    return instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => res.data)
  }
}
