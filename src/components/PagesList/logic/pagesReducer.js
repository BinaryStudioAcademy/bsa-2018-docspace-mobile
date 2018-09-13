import { combineReducers } from 'redux'
import * as actionTypes from './pagesActionTypes'

const initialState = {
  all: [],
  byId: {},
  isFetching: false,
  pageComments: []
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.all

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    default: return state
  }
}


function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.GET_PAGE_BY_ID_REQUEST:
      return true
    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.GET_PAGE_BY_ID_ERROR:
    case actionTypes.CANCEL_PAGE_BY_ID_REQUEST:
      return false
    default:
      return state
  }
}

export default combineReducers({
  all,
  byId,
  isFetching
})

export const allPages = ({pages}) => pages.all.map(id => pages.byId[id])

// TODO: test this. Usage: for getting all pages for space
export const pagesByIdsArray = ({pages}, ids) => ids.map(id => pages.byId[id])

export const pageByIdFromRoute = (state) => {
  const id = getPageIdFromRouterLocation(state.router.location)
  return state.pages.byId[id] || {}
}

export const isPagesFetching = ({ pages }) => {
  return pages.isFetching
}

