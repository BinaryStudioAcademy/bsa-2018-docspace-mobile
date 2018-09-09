import { combineReducers } from 'redux'
import { loginReducer } from '../components/Login/logic/loginReducer'
import  spaceReducer from '../components/SpacesList/logic/spacesReducer'
import pageReducer from '../components/PagesList/logic/pagesReducer'

const baseReducer = combineReducers({
  login: loginReducer,
  spaces: spaceReducer,
  pages: pageReducer
})

export default baseReducer