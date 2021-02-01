import React, {useContext, useState} from 'react'
import { BookContext } from './BookContext'
const BookForm = () => {
  const { AddBook } = useContext(BookContext)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const onhandleSubmit = e => {
    e.preventDefault()
    AddBook(title, author)
    setTitle('')
    setAuthor('')
  }
  return (
    <form onSubmit={onhandleSubmit}>
      <input type="text" placeholder='书名' onChange={e => setTitle(e.target.value)} value={title} />
      <input type="text" placeholder='作者' onChange={e => setAuthor(e.target.value)} value={author} />
      <button>添加</button>
    </form>
  )
}

export default BookForm