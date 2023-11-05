import { makeAutoObservable } from "mobx"
import { http, setToken, getToken, removeToken } from '@/utils'
class LoginStore {
  token = getToken() || ''
  construct () {
    makeAutoObservable(this)
  }

  getToken = async ({ mobile, code }) => {
    //不await 也是一行一行执行呀，和await没区别
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    console.log(res)
    this.token = res.data.token
    // http.post('http://geek.itheima.net/v1_0/authorizations', { mobile, code })
    //   .then((res) => {
    //     this.token = res.data.token
    //   })
    setToken(this.token)
  }

  //？？作用不清楚
  loginOut = () => {
    this.token = ''
    removeToken()
  }
}

export default LoginStore
