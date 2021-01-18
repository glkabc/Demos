const delelteAction = (index) => {
    return {
        type: 'DELETE_DATA',
        index
    }
}

const putAction = (task) => {
    return {
        type: 'PUT_DATA',
        task
    }
}

const setdataAction = (data) => {
    return {
        type: 'SET_DATA',
        data
    }
}

const loaddataAction = () => {
    return dispatch => {
        fetch('/data.json')
            .then(res => res.json())
            .then(result => {
                console.log(result.data)
                dispatch(setdataAction('task 4'))
            })
    }
}

export {
    delelteAction,
    putAction,
    setdataAction,
    loaddataAction
}