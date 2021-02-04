import React, {useContext} from 'react'
import {BookContext} from './BookContext'

const BookDetails = ({book}) => {
  const {RemoveBook} = useContext(BookContext)
  return (
    <li onClick={() => RemoveBook(book.id)}>
      <div className = 'title'>{book.title}</div>
      <div className = 'author'>{book.author}</div>
    </li>
  )
}

export default BookDetails