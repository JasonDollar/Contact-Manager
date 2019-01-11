import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import Header from './components/layout/Header';
import AddContact from './components/contacts/AddContact';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import EditContact from './components/contacts/EditContact';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Contacts from './components/contacts/Contacts.jsx';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route path="/about" component={About} />
                <Route path="/contact/add" component={AddContact} />
                <Route path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
