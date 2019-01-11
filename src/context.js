import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
  case 'DELETE_CONTACT':
    return {
      ...state,
      contacts: state.contacts.filter(item => item.id !== action.payload),
    };
  case 'ADD_CONTACT':
    return {
      ...state,
      contacts: [...state.contacts, action.payload],
    };
  case 'UPDATE_CONTACT':
    return {
      ...state,
      contacts: state.contacts.map(item => (
        item.id === action.payload.id ? (
          item = action.payload
        ) : item
      )),
    };
  default:
    return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoez2@gmail.com',
        phone: '124-213-123',
      },
      {
        id: 2,
        name: 'Karen Williams',
        email: 'karen2@gmail.com',
        phone: '124-2233-123',
      },
      {
        id: 3,
        name: 'Henry Johnson',
        email: 'henry@gmail.com',
        phone: '124-166-123',
      },
    ],
    dispatch: (action) => {
      this.setState(state => reducer(state, action));
    },
  }

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({
      contacts: res.data,
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'DELETE_CONTACT':
//       return {
//         ...state,
//         contacts: state.contacts.filter(
//           contact => contact.id !== action.payload
//         )
//       };
//     case 'ADD_CONTACT':
//       return {
//         ...state,
//         contacts: [action.payload, ...state.contacts]
//       };
//     case 'UPDATE_CONTACT':
//       return {
//         ...state,
//         contacts: state.contacts.map(
//           contact =>
//             contact.id === action.payload.id
//               ? (contact = action.payload)
//               : contact
//         )
//       };
//     default:
//       return state;
//   }
// };

// export class Provider extends Component {
//   state = {
//     contacts: [],
//     dispatch: action => this.setState(state => reducer(state, action))
//   };

//   async componentDidMount() {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/users');

//     this.setState({ contacts: res.data });
//   }

//   render() {
//     return (
//       <Context.Provider value={this.state}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

// export const Consumer = Context.Consumer;
