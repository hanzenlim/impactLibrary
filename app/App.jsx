import React from 'react';
import { render } from 'react-dom'
import styles from './App.css';
import CheckoutForm from './checkoutForm.jsx';
import CheckoutBookList from './checkoutBookList.jsx';
import CartList from './cartList.jsx';

import IsbnForm from './isbnForm.jsx';

import $ from "jquery";


const App = React.createClass({
  getInitialState() {
    return {
      bookList: [],
      cartList: []
    }
  },

  fetchCheckoutBooks () {
    var self = this
    var url = '/list'

    $.getJSON(url, function(result){

      var array = $.map(result, function(value, index) {
        value.key = index
        return value;
      });

      console.log(array);

      self.setState({bookList: array})
    });
  },

  // is going to run this function when all html is loaded.
  componentDidMount () {
    this.fetchCheckoutBooks()
  },

  handleSaveRow (name, date) {
    if (this.state.cartList.length === 0) {
      alert("shopping cart  can't be empty");
      return
    }

    var data = {}

    if (this.state.cartList.length > 0) {
      for (var index in this.state.cartList) {
        this.state.cartList[index].name = name
        this.state.cartList[index].date = date
      }

      data.cartList = this.state.cartList
    }

    var self = this
    $.post( "/db/write", data)
      .done(function( data ) {
        self.fetchCheckoutBooks()

        self.setState({
          cartList: []
        })
    });
  },

  addBookToCart (isbn, bookName, author) {
    var cartList = this.state.cartList

    cartList.push({
      isbn: isbn,
      bookName: bookName,
      author: author
    })

    this.setState({
      cartList: cartList
    })
  },

  returnBook (key) {
    var self = this

    var data = {}
    data.key = key
    $.post( "/return", data)
      .done(function( data ) {
        self.fetchCheckoutBooks()
    });
  },

  render() {
    return (
      <div className={styles.ptxxl}>
        <IsbnForm 
          addBookData={this.addBookToCart}
          isbn={this.state.isbn}
          bookName={this.state.bookName}
        />

        <CartList
          data = {this.state.cartList}
        />

        <CheckoutForm 
          saveRow={this.handleSaveRow}
        />

        

        <CheckoutBookList
          data = {this.state.bookList}
          removeBook = {this.returnBook}
        />
      </div>
    );
  }
})

export default App


