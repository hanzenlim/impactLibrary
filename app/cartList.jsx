import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery";
var otherTR = { backgroundColor:'rgba(254, 193, 75, 0.62)'}
const CartList = React.createClass({
  render() {
    const data = this.props.data.map(book => (
     
      <tr style={otherTR}>
        <td key={book.isbn}>{book.isbn}</td>
        <td>{book.bookName}</td>
        <td>{book.author}</td>
      </tr>
    ))

    return (
        <div>
        <h4>Shopping Cart</h4>
             <table className="table table-striped ">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Book Name</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {data}
              </tbody>
          </table>
      </div>
    )
  }
})

export default CartList


      

  
