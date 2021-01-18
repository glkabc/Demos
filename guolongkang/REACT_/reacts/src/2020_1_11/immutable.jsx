import React from 'react'
import {
  Map
} from 'immutable'

export default function Immutable () {

  let map1 = Map({
    a: 1,
    b: 2
  })

  let map2 = map1.set('a', 12)
  console.log(map1)
  console.log(map2)
  console.log(map1 === map2)

  let map3 = Map({
    a: 'x',
    b: 'y',
    c: 'z'
  })

  let map4 = map3.flip()  // 键值反转
  console.log(map4)
  let map5 = map4.map(v => v.toLocaleUpperCase())  // 值转大写
  console.log(map5)

  let map6 = Map({
    a: 0,
    b: 1,
    c: {
      d: 2
    }
  })

  let map7 = Map({
    b: 12,
    c: {
      e: 23
    },
    f: 34
  })

  // let map8 = map6.merge(map7)  // 浅拷贝
  let map8 = map6.mergeDeep(map7)
  console.log(map8.toJSON())

  return (
    <div>
      IMMUTABLE TEMPLATE
    </div>
  )
}