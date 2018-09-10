import * as actionTypes from './loginActionTypes'

const initialState = {
  requesting: false,
  isLoggedIn: false,
  messages: [],
  errors: [],
  user: null
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        requesting: true,
        isLoggedIn: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        user: null
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [action.response.message],
        requesting: false,
        isLoggedIn: true,
        user: action.response.user
      }
    case actionTypes.VERIFICATION:
      return {
        requesting: true,
        isLoggedIn: false,
        errors: [],
        user: null
      }
    case actionTypes.VERIFICATION_SUCCESS:
      return {
        requesting: false,
        user: action.response.message,
        isLoggedIn: action.response.isLoggedIn
      }
    case actionTypes.VERIFICATION_ERROR:
      return {
        requesting: false,
        isLoggedIn: false,
        user: null
      }

    case actionTypes.LOGIN_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date()
        }]),
        messages: [],
        requesting: false,
        isLoggedIn: false,
        user: null
      }
    case actionTypes.LOGOUT:
      return {
        requesting: true,
      }
    case actionTypes.LOGOUT_SUCCESS:
      return {
        requesting: false,
        isLoggedIn: false
      }
    case actionTypes.LOGOUT_ERROR:
      return {
        requesting: false,
        isLoggedIn: true
      }
    default:
      return state
  }
}
