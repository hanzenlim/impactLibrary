import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'
import $ from "jquery"
import styles from './App.css'


var title;
var author; 
var image;

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
      <div className={styles.mtm}>
        <h4>Personal Information</h4>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <p>
              <label>Name: <input
                type="text"
                value={name}
                onChange={(e) => {
                  this.setState({ name: e.target.value })
                }}
              /></label>
            </p>            
            <p>
              <label>Date: <input
                type="date"
                value={date}
                onChange={(e) => {
                  this.setState({ date: e.target.value })
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