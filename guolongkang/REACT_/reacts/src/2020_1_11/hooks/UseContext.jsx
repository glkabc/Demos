import React, { createContext, useContext } from "react";

let nameContext = createContext({name: 'ss'})
let ageContext = createContext({age: 15})
// let { Provider, Consumer } = createContext({name: 'ss'})

export default function UseContextHooks () {
  let x = useContext(nameContext)
  let y = useContext(ageContext)
  console.log(x)
  console.log(y)
  return (
    <div>
      <h3>Use COntext</h3>
      <p>{x.name} : {y.age}</p>
    </div>
  )
}