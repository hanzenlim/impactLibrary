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
      <tr>
        <td>{book.isbn}</td>
        <td>{book.bookName}</td>
        <td>{book.author}</td>
        <td>{book.name}</td>
        <td data-key={book.key} onClick={this.remove} className={buttonStyle}>return</td>
      </tr>
    ))

    return (
      <div>
        <h3>Checkout books</h3>
        <div className="table-responsive">
          <table className="table table-striped">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Book Name</th>
                  <th>Author</th>
                  <th>Borrowers Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
          </table>
        </div>
      </div>
    )
  }
})

export default BookList