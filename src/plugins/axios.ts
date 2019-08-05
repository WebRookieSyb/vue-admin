//axios封装参考https://juejin.im/post/5ae432aaf265da0b9c1063c8
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import router from '@/router/router';

//自定义封装一个axios插件

//默认配置
const config = {
    // baseURL: API_URL,
    // headers: {},
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
    // transformResponse: [function (data) {}]
}

const $axios = axios.create(config)

//拦截器

$axios.interceptors.request.use(
    config => {
        //请求开始的时候可以结合vuex开启loading动画

        //为请求带上token，可以结合vuex或者localStorage
        // if (store.getters.token) {
        //     config.headers['X-Token'] = getToken() //让每个请求携带token
        // } else {
        //     //重定向到登录页
        // }

        //根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method.toLocaleLowerCase() === 'post' || config.method.toLocaleLowerCase() === 'put' || config.method.toLocaleLowerCase() === 'delete') {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        //请求错误时（接口错误、超时等）

        //关闭lodding
        console.log('request:', error)

        //判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
            //对请求超时进行处理
            //return service.request(originalRequest)//比如在请求一次
        }
        //重定向到错误页面

        const errorInfo = error.transformResponse
        if (errorInfo) {
            error = errorInfo.data  //拿到详细的错误信息
            const errorStatus = errorInfo.status;  //错误码

            router.push({
                path: `/error/${errorStatus}`  //重定向到对应页面
            })
        }
        return Promise.reject(error)  //在调用那边可以拿到你想返回的错误信息
    }
)

$axios.interceptors.response.use(
    response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
            data = response.request.responseText
        } else {
            data = response.data
        }
        //根据返回的不同code来做不同的处理（和后端约定）
        // switch (data.code) {
        //     case '':
        //         break;
        //     default:
        // }
        //如果不是正确返回的多code，且已经登录，就抛出错误
        // const err = new Error(data.description)
        // err.data = data
        // err.response = response
        // throw err
        return data
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误'
                    break

                case 401:
                    error.message = '未授权，请登录'
                    break

                case 403:
                    error.message = '拒绝访问'
                    break

                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`
                    break

                case 408:
                    error.message = '请求超时'
                    break

                case 500:
                    error.message = '服务器内部错误'
                    break

                case 501:
                    error.message = '服务未实现'
                    break

                case 502:
                    error.message = '网关错误'
                    break

                case 503:
                    error.message = '服务不可用'
                    break

                case 504:
                    error.message = '网关超时'
                    break

                case 505:
                    error.message = 'HTTP版本不受支持'
                    break

                default:
            }
            //提示错误

            return Promise.reject(error)
        }
    }
)

//请求处理
// $axios(options).then((res) => {
//     resolve(res)
//     return false
// })
// .catch((error) => {
//     reject(error)
// })

//封装成插件
Plugin.install = function(Vue, options) {
    Vue.axios = $axios
    //在Vue到原型上添加axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return $axios
            }
        } 
    })
}

//全局引入插件
Vue.use(Plugin, VueAxios);

export default Plugin




