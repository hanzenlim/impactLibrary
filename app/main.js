import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import CheckoutBookList from './checkoutBookList.jsx';

import { Router, Route, Link, hashHistory } from 'react-router'

ReactDOM.render((
	<Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/checkoutbooks" component={CheckoutBookList} />
  </Router>), document.getElementById('root'));


// ReactDOM.render(<App />, document.getElementById('root'));
