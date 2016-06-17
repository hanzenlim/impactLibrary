import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery"
import styles from './App.css'


const BookList = React.createClass({

  remove (e) {
    e.stopPropagation()
    e.preventDefault()

    var answer = confirm("Are you sure you want to return this book")
    if (answer) {
      this.props.removeBook($(e.currentTarget).data("key"))
    }
  },
  
  render() {
    var buttonStyle = "btn btn-primary " + styles.mlm

    const data = this.props.data.map(book => (
      <li key={book.key} className={styles.pvm}  >ISBN: {book.isbn} Name: {book.name} Book Name: {book.bookName} Author: {book.author} 
        <div data-key={book.key} onClick={this.remove} className={buttonStyle}>return</div>
      </li>
    ))

    return (
      <div>
        <h3>Checkout books</h3>
        <ul>
          {data}
        </ul>
      </div>
    )
  }
})

export default BookList