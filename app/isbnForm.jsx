import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import styles from './App.css';
import $ from "jquery";

var title;
var author; 
var image;

const IsbnForm = React.createClass({
  getInitialState() {
    return {
      isbn: '',
      bookName: '',
      author: '',
      image: ''
    }
  },

  // this is where your google api should happen
  handleISBNForm (e) {
    e.stopPropagation()
    e.preventDefault()

    var isbn = this.state.isbn
    var self = this

    if (isbn === '') {
      return false
    }

    // use this to test --> s1gVAAAAYAAJ or 0716604892 
    // API call to google books
    $.getJSON('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn, function(data) {

      var item = '' 
      var title = ''
      var author = ''
      var image = ''

      if (data.items && data.items[0]) {
        item = data.items[0]
      }
      
      if (item && item.volumeInfo && item.volumeInfo.title) {
        title = item.volumeInfo.title
      }

      if (item && item.volumeInfo && item.volumeInfo.authors[0]) {
        author = data.items[0].volumeInfo.authors[0]
      }

      if (item && 
          item.volumeInfo && 
          item.volumeInfo.imageLinks && 
          item.volumeInfo.imageLinks.smallThumbnail) {
        image = item.volumeInfo.imageLinks.smallThumbnail
      }


      self.setState({isbn: isbn})
      self.setState({bookName: title})
      self.setState({author: author})
      self.setState({image: image})

      self.props.saveBookData(isbn, title, author)
    });
  },

  render() {
    const {
      isbn,
      bookName,
      author,
      image
    } = this.state

    var divStyle = {
      color: 'red',
      background: 'yellow'
    };
    var cssStyles = styles.mts
    var buttonStyles = 'btn btn-primary'

    console.log(styles.mtl);

    return (
      <div className="row">
        <div className="col-sm-6">
          <h4>Book Information</h4>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label">ISBN:</label>
            <div className="col-sm-9">
              <input
                type="text"
                value={isbn}      
                onChange={(e) => {
                  this.setState({ isbn: e.target.value })
                }}
                onBlur={this.handleISBNForm}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label">Book Name:</label>
            <div className="col-sm-9">
              <input
                type="text"
                value={bookName}      
                onChange={(e) => {
                  this.setState({ bookName: e.target.value })
                }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 form-control-label">Author:</label>
            <div className="col-sm-9">
              <input
                type="text"
                value={author}      
                onChange={(e) => {
                  this.setState({ author: e.target.value })
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <img src={image} />
        </div>
      </div>
    )
  }
})

export default IsbnForm