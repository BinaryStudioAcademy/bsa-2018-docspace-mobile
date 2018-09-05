import { callWebApi } from '../helpers/requestHelper'

class LoginService {
  login (data) {
    console.log(data)
    const args = { endpoint: 'http://docspace.xyz/api/login', method: 'POST', body: JSON.stringify(data) }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  verification () {
    const args = { endpoint: 'http://docspace.xyz/api/autologin', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  logout () {
    localStorage.removeItem('token')
  }
}

export const loginService = new LoginService()
