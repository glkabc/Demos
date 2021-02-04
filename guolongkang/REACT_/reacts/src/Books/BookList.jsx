import React, { useContext } from 'react'
import {BookContext} from './BookContext'
import BookDetails from './BookDetails'

const BooksList = () => {
  const {books} = useContext(BookContext)
  return books.length ? (
    <div className = 'book-list'>
      <ul>
        {books.map(book => {
          return (<BookDetails book={book} key={book.id} />)
        })}
      </ul>
    </div>
  ) : (
    <div className = 'empty'>没有数据！</div>
  )
}

export default BooksList