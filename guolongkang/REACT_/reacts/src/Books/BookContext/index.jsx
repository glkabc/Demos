import React, {createContext, useState} from 'react'
import {v4 as uuidv4} from 'uuid'

export const BookContext = createContext()

const BookContextProvider = (props) => {
  let [books, setBooks] = useState([
    {title: '冰与火之歌', author: '忘了', id: 1},
    {title: '冰与火之歌', author: '忘了', id: 2},
    {title: '冰与火之歌', author: '忘了', id: 3}
  ])

  const AddBook = (title, author) => {
    setBooks([...books, {title, author, id: uuidv4()}])
  }

  const RemoveBook = (id) => {
    setBooks(books.filter(val => val.id !== id))
  }

  return (
    <BookContext.Provider value = {{books, AddBook, RemoveBook}}>
      {props.children}
    </BookContext.Provider>
  )
}

export default BookContextProvider