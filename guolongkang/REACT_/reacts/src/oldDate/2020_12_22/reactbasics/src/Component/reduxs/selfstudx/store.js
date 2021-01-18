import { changeState} from './componentJs/changeState'

let state = {
    count: 0
}

const createStore = () => {
    const getState = () => state

    // 观察者模式
    const listeners = []
    const subscribe = listener => listeners.push(listener)

    const dispatch = (action) => {
        state = changeState(state, action)
        // render(state)
        listeners.forEach(listener => listener())
    }

    return {
        dispatch,
        getState,
        subscribe
    }
}

const store = createStore()

const render = () => {
    document.querySelector('#count').innerHTML = store.getState().count
}

store.subscribe(render)

export default store