import React, { Component } from 'react';
// import uuid from 'uuid';
import axios from 'axios';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';

export class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {},
  }

  onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({ [name]: value });
  }

  onFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }
    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }
    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

    const newContact = {
      name, email, phone,
    };
    const res = await axios.post('https://jsonplaceholder.typicode.com/users/', newContact);

    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data,
    });

    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {},
    });
    this.props.history.push('/');
  }

  render() {
    const {
      name, email, phone, errors,
    } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onFormSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onInputChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter email..."
                    value={email}
                    type="email"
                    onChange={this.onInputChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onInputChange}
                    error={errors.phone}
                  />
                  <button type="submit" className="btn btn-light btn-block">Add contact</button>
                </form>

              </div>

            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
