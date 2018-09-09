import * as actionTypes from './loginActionTypes'

export const loginRequest = (email, password) => ({
    type: actionTypes.LOGIN_REQUESTING,
    payload: {email, password}
  })

export const verificationRequest = () => ({
  type: actionTypes.VERIFICATION
})

