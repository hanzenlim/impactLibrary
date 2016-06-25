import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery"
import styles from './App.css'


var title;
var author; 
var image;
var okButt = {
    color: 'black',
    backgroundColor: '#fec14b',
    border: 'none',
    width: '10%',
    height: '50px',
    fontSize: '15px'
};

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      name: '',
      date: this.getTodayDate()
    }
  },

  getTodayDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    return yyyy+'-'+mm+'-'+dd;
  },

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.name === '' || this.state.date === '') {
      alert("name and date fields can't be empty")
      return false
    }

    this.props.saveRow(this.state.name, this.state.date);

    this.setState({
      name: '',
      date: this.getTodayDate()
    })
  },

  render() {
    const {
      name,
      date
    } = this.state

    return (
      <div className={styles.mtxl}>
        <h3>Personal Information</h3>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="form-group">
            <p>
              <label className={styles.grey}>Borrowers Name: <input
                className="form-control"
                type="text"
                value={name}
                onChange={(e) => {
                  this.setState({ name: e.target.value })
                }}
              /></label>
            </p>            
            <p>
              <label className={styles.grey}>Date: <input
                className="form-control"
                type="date"
                value={date}
                onChange={(e) => {
                  this.setState({ date: e.target.value })
                }}
              /></label>
            </p>
          </fieldset>
          <button className="btn btn-primary" style={okButt}>CHECKOUT</button> 
        </form>
      </div>
    )
  }
})

export default CheckoutForm