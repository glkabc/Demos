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

export {
    delelteAction,
    putAction
}