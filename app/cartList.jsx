import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery";

const CartList = React.createClass({
  render() {
    const data = this.props.data.map(book => (
      <li key={book.isbn} >ISBN: {book.isbn} Book Name: {book.bookName} Author: {book.author}</li>
    ))

    return (
      <div>
        <h4>Shopping Cart</h4>
        <ul>
          {data}
        </ul>
      </div>
    )
  }
})

export default CartList