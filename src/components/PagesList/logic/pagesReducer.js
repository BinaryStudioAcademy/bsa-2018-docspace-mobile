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

    case actionTypes.DELETE_PAGE_SUCCESS:
    case actionTypes.DELETE_BLOG_PAGE_SUCCESS:
      return state.filter(id => id !== action.payload._id)

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.CREATE_BLOG_PAGE_SUCCESS:
    case actionTypes.SEND_DOC_FILE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE_SUCCESS:
    case actionTypes.UPDATE_PAGE_SUCCESS + '(EXTERNAL)':
    case actionTypes.UPDATE_BLOG_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case commentsActionTypes.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        [action.payload.page._id]: {
          ...action.payload.page,
          comments: [...action.payload.page.comments.slice(), action.payload.newComment]
        }
      }
    case likesActionTypes.PUT_LIKE_ON_PAGE_SUCCESS:
      return {
        ...state,
        [action.payload.page._id]: {
          ...action.payload.page,
          usersLikes: [...action.payload.page.usersLikes.slice(), action.payload.likedUser]
        }
      }

    case likesActionTypes.DELETE_LIKE_FROM_PAGE_SUCCESS:
      return {
        ...state,
        [action.payload.page._id]: {
          ...action.payload.page,
          usersLikes: action.payload.page.usersLikes.filter(user => user._id !== action.payload.unlikedUser._id)
        }
      }


    case actionTypes.GET_ALL_PAGES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.CREATE_BLOG_PAGE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    default: return state
  }
}


function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.GET_PAGE_BY_ID_REQUEST:
    case actionTypes.UPDATE_PAGE_REQUEST:
    case actionTypes.UPDATE_BLOG_PAGE_REQUEST:
    case actionTypes.MOVE_PAGE_TO_SPACE_REQUEST:
    case actionTypes.COPY_PAGE_REQUEST:
      return true
    case actionTypes.GET_PAGE_BY_ID_SUCCESS:
    case actionTypes.GET_PAGE_BY_ID_ERROR:
    case actionTypes.CANCEL_PAGE_BY_ID_REQUEST:
    case actionTypes.CREATE_PAGE_SUCCESS:
    case actionTypes.CREATE_PAGE_ERROR:
    case actionTypes.UPDATE_PAGE_SUCCESS:
    case actionTypes.UPDATE_BLOG_PAGE_SUCCESS:
    case actionTypes.MOVE_PAGE_TO_SPACE_SUCCESS:
    case actionTypes.COPY_PAGE_SUCCESS:
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

