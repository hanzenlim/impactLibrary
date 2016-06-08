import React from 'react';
import { render } from 'react-dom'
import styles from './App.css';
import CheckoutForm from './checkoutForm.jsx';
import CheckoutBookList from './checkoutBookList.jsx';
import $ from "jquery";


const App = React.createClass({
  getInitialState() {
    return {
      bookList: []
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

      console.log('####');
      console.log(array);

      self.setState({bookList: array})
    });
  },

  handleSaveRow (isbn, name) {
    console.log('handle save row')

    var bookListArray = this.state.bookList
    bookListArray.push({isbn: isbn, name: name})

    this.setState({bookList: bookListArray})
  },

  render() {
    return (
      <div>
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


