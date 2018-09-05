import { combineReducers } from 'redux'
import { loginReducer } from '../components/Login/logic/loginReducer'


const baseReducer = combineReducers({
  login: loginReducer
})

export default baseReducer