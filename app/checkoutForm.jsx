import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery";

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      isbn: '',
      name: ''
    }
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.saveRow(this.state.isbn, this.state.name);

    this.setState({
      isbn: '',
      name: '',
      bookName: '',
      author: ''
    })
  },

  // this is where your google api should happen
  handleISBNForm (e) {
    e.stopPropagation()
    e.preventDefault()

    // ajax call
    console.log("This is my isbn" + this.state.isbn)
    var isbn = this.state.isbn


    this.setState({bookName: 'Harry Potter'})
    this.setState({author: 'John Raxa'})

    console.log(e + "I was click");
  },

  render() {
    const {
      isbn,
      name,
      bookName,
      author
    } = this.state

    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>ISBN: <input
                type="text"
                value={isbn}      
                onChange={(e) => {
                  this.setState({ isbn: e.target.value })
                }}
              /></label>
            </p>
            <div>
              <button onClick={this.handleISBNForm} className="btn btn-primary">Search</button>
            </div>
            <p>
              <label>Book name: <input
                type="text"
                value={bookName}      
              /></label>
            </p>
            <p>
              <label>Author: <input
                type="text"
                value={author}      
              /></label>
            </p>
            
            <p>
              <label>Name: <input
                type="text"
                value={name}
                onChange={(e) => {
                  this.setState({ name: e.target.value })
                }}
              /></label>
            </p>
          </fieldset>
          <button className="btn btn-primary">ok</button> 
        </form>
      </div>
    )
  }
})

export default CheckoutForm