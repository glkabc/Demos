const defaultState = {
    list: ['task 1', 'task 2']
}

const store = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                list: [
                    ...state.list,
                    action.data
                ]
            }
        case 'PUT_DATA':
            return {
                list: [
                    ...state.list,
                    action.task
                ]
            }
            case 'DELETE_DATA':
                let newList = state.list.filter((value, index) => {
                    return index !== action.index
                })
                return {
                    ...state,
                    list: newList
                }
        default:
            return state
    }
}

export default store