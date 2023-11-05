
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class UserStore {
  userInfo = {}
  constructor() {
    makeAutoObservable(this)
  }
  async getUserInfo () {
    const res = await http.get('/user/profile')
    this.userInfo = res.data
    // console.log(JSON.stringify(res.data) + "AAA")
    // console.log("bbb" + JSON.stringify(this.userInfo))
  }
}

export default UserStore
