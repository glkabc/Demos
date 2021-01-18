import React from 'react'

const textContext = React.createContext();
const { Provider, Consumer} = textContext;

export {
    textContext,
    Provider,
    Consumer
}