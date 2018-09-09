import * as actionTypes from './spacesActionTypes'
import { combineReducers } from 'redux'

const initialState = {
  all: [],
  byId: {},
  isFetching: false
}

function all (state = initialState.all, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.all

    case actionTypes.DELETE_SPACE_SUCCESS:
    case actionTypes.DELETE_CATEGORY_SUCCESS: {
      return state.filter(id => id !== action.payload._id)
    }

    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.CREATE_SPACE_SUCCESS:
      return [ ...state, action.payload._id ]

    default: return state
  }
}

function byId (state = initialState.byId, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SPACE_SUCCESS:
    case actionTypes.ADD_NEW_INFO_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    case actionTypes.GET_ALL_SPACES_SUCCESS:
      return action.payload.byId

    case actionTypes.GET_SPACE_SUCCESS:
      return { ...state, [action.payload._id]: action.payload }

    default: return state
  }
}

function isFetching (state = initialState.isFetching, action) {
  switch (action.type) {
    case actionTypes.GET_ALL_SPACES_REQUEST:
    case actionTypes.GET_SPACE_REQUEST:
      return true
    case actionTypes.GET_ALL_SPACES_SUCCESS:
    case actionTypes.GET_ALL_SPACES_ERROR:
    case actionTypes.GET_SPACE_SUCCESS:
    case actionTypes.GET_SPACE_ERROR:
    case actionTypes.ADD_NEW_INFO_SPACE_SUCCESS:
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

// SELECTOR
// usage: import this selector and do this :
// const mapStateToProps = ( state) => { spaces: allSpaces(state) }
// Now you have array of spaces objects

export const allSpaces = ({spaces}) => spaces.all.map(id => spaces.byId[id])

export const spaceById = (state) => {
  const id = state.router.location.pathname.split('/')[2]
  return state.spaces.byId[id]
}

export const getUserId = ({verification}) => verification.user._id

export const isSpacesFetching = ({ spaces }) => spaces.isFetching
