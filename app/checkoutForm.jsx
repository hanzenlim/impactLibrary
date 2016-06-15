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
      data: ''
    }
  },

  handleSubmit(e) {
    e.preventDefault();

    this.props.saveRow(this.state.name, this.state.date);

    this.setState({
      name: '',
      date: ''
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