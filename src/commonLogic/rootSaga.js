
import { fork, all } from 'redux-saga/effects'
import loginWatcher from '../components/Login/logic/loginSaga'


function * rootSaga () {
  yield all([
    loginWatcher()
  ])
}

export default rootSaga
