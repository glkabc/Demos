import React from 'react'
import BookContextProvider from './BookContext'
import BooksList from './BookList'
import './index.css'

import NavBar from './NavBar'
import BookForm from './BookForm'
const Books = () => {
  return (
    <BookContextProvider>
      <NavBar />
      <BooksList />
      <BookForm />
    </BookContextProvider>
  )
}

export default Books