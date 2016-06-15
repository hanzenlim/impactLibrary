import React from 'react';
import { render } from 'react-dom'
import styles from './App.css';
import CheckoutForm from './checkoutForm.jsx';
import CheckoutBookList from './checkoutBookList.jsx';
import IsbnForm from './isbnForm.jsx';

import $ from "jquery";


const App = React.createClass({
  getInitialState() {
    return {
      bookList: [],
      isbn: '',
      bookName: '',
      author: ''
    }
  },

  // is going to run this function when all html is loaded.
  componentDidMount () {
    var self = this
    var url = '/list'

    $.getJSON(url, function(result){
      console.log(result)

      var array = $.map(result, function(value, index) {
        return [value];
      });

      self.setState({bookList: array})
    });
  },

  handleSaveRow (name, date) {
    var self = this
    var data = {}
    data.name = name
    data.date = date
    data.isbn = this.state.isbn
    data.bookName = this.state.bookName
    data.author = this.state.author


    $.post( "/db/write", data)
      .done(function( data ) {
        var bookListArray = self.state.bookList
        bookListArray.push({
          name: name, 
          date: date, 
          isbn: self.state.isbn,
          bookName: self.state.bookName,
          author: self.state.author
        })

        self.setState({bookList: bookListArray})
    });
  },

  handleBookData (isbn, bookName, author) {
    this.setState({
      isbn: isbn,
      bookName: bookName,
      author: author
    })
  },

  render() {
    return (
      <div className={styles.mtxl}>
        <IsbnForm 
          saveBookData={this.handleBookData}
          isbn={this.state.isbn}
          bookName={this.state.bookName}
        />

        <CheckoutForm 
          saveRow={this.handleSaveRow}
        />

        <CheckoutBookList
          data = {this.state.bookList}
        />

        <div className={styles.app}>
        </div> 
      </div>
    );
  }
})

export default App


