import { take, fork, call, put, takeEvery } from 'redux-saga/effects'
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

function * verificationFlow () {
  try {
    let response = yield call(loginService.verification)
    console.log(response)
    if (!response.isLoggedIn) {
      throw new Error(response.message)
    }
    yield put({ type: actionTypes.VERIFICATION_SUCCESS, response })
  } catch (error) {
    yield put({ type: actionTypes.VERIFICATION_ERROR, error })
  }
}

export function * logoutFlow () {
    try {
      yield call(loginService.logout)
      yield put({ type: actionTypes.LOGOUT_SUCCESS })
    } catch (err) {
      console.log(err)
    }
}

export function * loginWatcher () {
  while (true) {
    const action = yield take(actionTypes.LOGIN_REQUESTING)
    yield fork(loginFlow, action)
  }
}

export function * verficationWatcher () {
  yield takeEvery(actionTypes.VERIFICATION, verificationFlow)
}

export function * logoutWatcher () {
  yield takeEvery(actionTypes.LOGOUT, logoutFlow)
}