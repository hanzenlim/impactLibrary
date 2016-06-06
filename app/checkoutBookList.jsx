import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery";

const BookList = React.createClass({
  render() {
    const data = this.props.data.map(book => (
      <li key={book.name} >ISBN: {book.isbn} Name: {book.name}</li>
    ))

    return (
      <div>
        <h1>Book List</h1>
        <ul>
          {data}
        </ul>
      </div>
    )
  }
})

export default BookList