import { createStore, applyMiddleware } from 'redux'
import redux from './redux'
import thunk from 'redux-thunk'

const store = createStore(redux, applyMiddleware(thunk))

// 引入中间件

export default store