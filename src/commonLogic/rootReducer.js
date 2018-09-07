import { combineReducers } from 'redux'
import { loginReducer } from '../components/Login/logic/loginReducer'
import  spaceReducer from '../components/SpacesList/logic/spacesReducer'

const baseReducer = combineReducers({
  login: loginReducer,
  spaces: spaceReducer
})

export default baseReducer