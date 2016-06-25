import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery"
import styles from './App.css'

   var buttStyle = {
        color: 'black',
        backgroundColor: '#fec14b',
        border: 'none',
        marginLeft: '-1%',
        height: '30px',
        marginTop: '2%',
        paddingTop: '5px'
    }
const BookList = React.createClass({
  getInitialState() {
    return {
      bookList: [],
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

      self.setState({bookList: array})
      self.orignalBookList = array
    });
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

  // is going to run this function when all html is loaded.
  componentDidMount () {
    this.fetchCheckoutBooks()
  },

  remove (e) {
    e.stopPropagation()
    e.preventDefault()

    var answer = confirm("Are you sure you want to return this book")
    if (answer) {
      this.returnBook($(e.currentTarget).data("key"))
    }
  },

  filterList (value) {
    if (value === '') {
      this.setState({bookList: this.orignalBookList})
    } else {
      var filteredArray = this.state.bookList.filter(function (obj) {
        if ('name' in obj && obj.name.toLowerCase().match(value.toLowerCase())) {
          return true
        } else {
          return false
        }
      })

      this.setState({bookList: filteredArray})
    }
  },
  
  render() {
    var buttonStyle = "btn btn-primary " + styles.mlm

    const data = this.state.bookList.map(book => (
      <tr>
        <td>{book.date}</td>
        <td>{book.bookName}</td>
        <td>{book.author}</td>
        <td>{book.name}</td>
        <td style={buttStyle} data-key={book.key} onClick={this.remove} className={buttonStyle}>RETURN</td>
      </tr>
    ))

    return (
      <div>
        <h3>Checked Out Books</h3>
        <div className={styles.mtl}>Filter By Name: <input type="text" onChange={(e) => {
                  this.filterList(e.target.value)
                }} />
        </div>
        <div className={styles.mtl + " table-responsive"}>
          <table className="table table-striped ">
              <thead>
                <tr>
                  <th>Date</th>
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