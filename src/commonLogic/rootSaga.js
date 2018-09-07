
import { fork, all } from 'redux-saga/effects'
import loginWatcher from '../components/Login/logic/loginSaga'
import spacesSaga from '../components/SpacesList/logic/spacesSaga'
import pagesSaga from '../components/PagesList/logic/pagesSaga'



function * rootSaga () {
  yield all([
    fork(spacesSaga),
    fork(pagesSaga),
    loginWatcher()
  ])
}

export default rootSaga
