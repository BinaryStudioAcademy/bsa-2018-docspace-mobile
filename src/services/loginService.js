import { callWebApi } from '../helpers/requestHelper'
import { AsyncStorage } from 'react-native'


class LoginService {
  login (data) {
    const args = { endpoint: '/login', method: 'POST', body: JSON.stringify(data), login: true }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  verification () {
    const args = { endpoint: '/autologin', method: 'GET' }
    const apiResult = callWebApi(args)
      .then(res => res.json())
      .catch(err => console.log(`Error: ${err}`))
    return apiResult
  }
  async logout () {
    await AsyncStorage.removeItem('token')
  }
}

export const loginService = new LoginService()
