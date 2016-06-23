import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery";

const { arrayOf, string, number, shape } = React.PropTypes

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

const MainApp = React.createClass({
  getInitialState() {
    return {
      isbn: '',
      name: '',
      data: this.props.data
    }
  },

  handleSaveRow(isbn, name) {
    console.log(isbn);
    console.log(name);

    var data = this.state.data;


    data.push({isbn: isbn, name: name})
    this.setState({data: data})
  },

  render() {
    return (
      <div>
        <CheckoutForm 
          saveRow={this.handleSaveRow}
        />

        <BookList 
          data = {this.props.data}
        />
      </div>
    )
  }
});

const DATA = [
  { id: 1, isbn: 1, name: 'Tim Duncan' },
  { id: 2, isbn: 2, name: 'Tony Parker' },
  { id: 3, isbn: 3, name: 'Manu Ginobili' }
]

render(<MainApp data={DATA} />, document.getElementById('app'))
