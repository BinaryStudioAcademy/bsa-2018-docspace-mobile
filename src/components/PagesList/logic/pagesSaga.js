import { takeEvery, put, select } from 'redux-saga/effects'
import * as actions from './pagesActions'
import * as actionTypes from './pagesActionTypes'
import PageService from '../../../services/pageService'
import { normalize } from 'normalizr'
import { pagesArray } from './pagesNormalizerSchema'

function * getPages (action) {
  try {
    const pages = yield PageService.getPages()
    const normalized = normalize(pages, pagesArray)
    const all = normalized.result
    const byId = normalized.entities.byId || {}
    yield put(actions.allPagesFetchedAndNormalized(all, byId))
  } catch (e) {
    console.log(e)
    yield put(actions.getAllPagesError())
  }
}

function * getPage (action) {
  try {
    // const pages = yield select(pagesById)
    // if (pages[action.payload.id] && !action.payload.version) {
    //   yield put(actions.cancelPageByIdRequst())
    //   return
    // }
    const page = yield PageService.getPage(action.payload)
    yield put(actions.getPageByIdSuccess(page))
  } catch (e) {
    yield put(actions.getPageByIdError())
  }
}


export default function * selectionsSaga () {
  yield takeEvery(actionTypes.GET_ALL_PAGES_REQUEST, getPages)
  yield takeEvery(actionTypes.GET_PAGE_BY_ID_REQUEST, getPage)
}
