import logo from './logo.svg';
import './App.css';
import React from 'react';
import UsersList from './components/User';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }
  componentDidMount() {
    const users = [
    {
    'first_name': 'Фёдор',
    'last_name': 'Достоевский',
    'age': 1821,
    'email': 'nikol@nikol.ru'
    },
    {
    'first_name': 'Александр',
    'last_name': 'Грин',
    'age': 1880,
    'email': 'nikol@nikol.ru'
    },
    ]
    this.setState(
    {
    'users': users
    }
    )
    }
  render () {
    return(
    <div>
      <UsersList users={this.state.users} />
    </div>
    )
  }
}

export default App;
