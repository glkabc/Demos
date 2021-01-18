const { createStore } = require('redux')
// console.log(redux)

const reducer = require('./reducer')
const store = createStore(reducer)
// console.log(store)

store.subscribe(() => {
    console.log(store.getState())
})

store.dispatch({
    type: 'increment'
})

setInterval(() => {
    store.dispatch({type: 'increment'})
}, 1000)
// console.log(store.getState())