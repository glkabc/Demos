import React, {useContext} from 'react'
import {BookContext} from './BookContext'

const NavBar = () => {
  let { books } = useContext(BookContext)

  return (
    <div className = 'navbar'>
      <h1>阅读清单</h1>
      <p>当前待阅读：{books.length}本。</p>
    </div>
  )
}

export default NavBar
