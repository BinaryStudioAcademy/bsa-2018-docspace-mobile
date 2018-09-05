import * as actionTypes from './loginActionTypes'

const loginRequest = (email, password) => {
  return ({
    type: actionTypes.LOGIN_REQUESTING,
    payload: {email, password}
  })
}

export default loginRequest
