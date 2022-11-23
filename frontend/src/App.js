import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from 'axios';
import {HashRouter, Route, Link, Switch} from 'react-router-dom'

// Componenets
import UsersList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';
import TodoList from './components/Project'; 


const NotFound404 = ({ location }) => {
  return (
  <div>
  <h1>Страница по адресу '{location.pathname}' не найдена</h1>
  </div>
  )
  }
  

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [],
      'projects': []
    }
  }
  componentDidMount() {
    // get User
    axios.get('http://127.0.0.1:8000/api/users')
    .then(response => {
      const users = response.data
      this.setState(
        {
          'users': users
        }
      )
     }
    ).catch(error => console.log(error))
    // get Project
    axios.get('http://127.0.0.1:8000/api/projects')
    .then(response => {
      const projects = response.data
      this.setState(
        {
          'projects': projects
        }
      )
     }
    ).catch(error => console.log(error))
    }
  render () {
    return(
    <div className='App'>
      <HashRouter>
        <Menu />
        <Route exact path='/' component={
          () => <UsersList users={this.state.users} />
        } />
        <Route exact path='/projects' component={
          () =>  <ProjectList items={this.state.projects} />
        } />
       
        <Footer />
      </HashRouter>
    </div>
    )
  }
}

export default App;
