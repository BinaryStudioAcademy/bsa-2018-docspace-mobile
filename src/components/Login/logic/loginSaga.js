import { take, fork, call, put } from 'redux-saga/effects'
import { loginService } from '../../../services/loginService'
import * as actionTypes from './loginActionTypes'
import { AsyncStorage } from 'react-native'



const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
  } catch (err) {
    console.want('error to set token', err)
  }
}

function * loginFlow (action) {
  try {
    const { email, password } = action.payload
    console.log(email, password)
    let response = yield call(loginService.login, {email, password})
    console.log('in saga response', response)
    if (!response.success) {
      throw new Error(response.message)
    }
    console.log('in saga')
    yield setToken(response.token)
    yield put({ type: actionTypes.LOGIN_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.LOGIN_ERROR, error })
  }
}

function * loginWatcher () {
  while (true) {
    const action = yield take(actionTypes.LOGIN_REQUESTING)
    yield fork(loginFlow, action)
  }
}

export default loginWatcher
