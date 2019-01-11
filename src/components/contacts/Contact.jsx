import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';


class Contact extends Component {
  state = {
    showContactInfo: false,

  }

  onShowClick = () => {
    this.setState({ showContactInfo: !this.state.showContactInfo });
  }

  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    dispatch({
      type: 'DELETE_CONTACT',
      payload: id,
    });
  }

  render() {
    const {
      name, email, phone, id,
    } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}
                <i
                  className="fas fa-sort-down"
                  onClick={this.onShowClick}
                  style={{
                    cursor: 'pointer',

                  }}
                />
                <i
                  className="fas fa-times"
                  style={{ cursor: 'pointer', float: 'right', color: 'red' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`/contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem',
                    }}
                  />
                </Link>

              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">


                    {'Email:'}
                    {email}
                  </li>
                  <li className="list-group-item">


                    {'Phone:'}
                    {phone}
                  </li>
                </ul>
              ) : null

              }

            </div>
          );
        }}
      </Consumer>


    );
  }
}

export default Contact;


Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  // deleteClickHandler: PropTypes.func.isRequired,
};