import React from 'react'
import UseCustomHooks from "./CustomUseHooks/useCount"

export default function CustomHooks() {
  console.log(UseCustomHooks(1))
  return (
    <div>
      <h3>Use CustomUseHooks</h3>
    </div>
  )
}
