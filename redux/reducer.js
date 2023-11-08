import { combineReducers } from 'redux'
import isLoginSlice from './isLoginSlice'

const rootReducer = combineReducers({
    isLogin:isLoginSlice
})

export default rootReducer