import * as actionTypes from './loginActionTypes'

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  user: null
}

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
        user: null
      }

    case actionTypes.LOGIN_SUCCESS:
      return {
        errors: [],
        messages: [action.response.message],
        requesting: false,
        successful: true,
        user: action.response.user
      }
    case actionTypes.VERIFICATION:
      return {
        requesting: true,
        successful: false,
        errors: [],
        user: null
      }
    case actionTypes.VERIFICATION_SUCCESS:
      return {
        requesting: false,
        user: action.response.message,
        successful: action.response.isLoggedIn
      }
    case actionTypes.VERIFICATION_ERROR:
      return {
        requesting: false,
        successful: false,
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
        successful: false,
        user: null
      }

    default:
      return state
  }
}
