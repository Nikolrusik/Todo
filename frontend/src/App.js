import './App.css';
import React from 'react';
import axios from 'axios';
import {BrowserRouter, HashRouter,Route, Navigate, Routes, useLocation} from 'react-router-dom'

// Componenets
import UsersList from './components/User';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/Project'; 
import ProjectPage from './components/ProjectPage'; 
import TodoList from './components/ProjectItem'


const NotFound404 = ({location}) => {
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
      'projects': [],
      'todo': []
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
    axios.get('http://localhost:8000/api/projects/')
    .then(response => {
      const projects = response.data
      this.setState(
        {
          'projects': projects
        }
      )
     }
    ).catch(error => console.log(error))
    // get Todo
    axios.get('http://localhost:8000/api/todo/')
    .then(response => {
      const todo = response.data
      this.setState(
        {
          'todo': todo
        }
      )
     }
    ).catch(error => console.log(error))
    }
  render () {
    return(    
      <div>
      <BrowserRouter>
         <Menu /> 
        <Routes>
          <Route exact path="/" element={<UsersList users={this.state.users} />}/>
          <Route path='/projects' element={<ProjectList items={this.state.projects} /> } />
          <Route path='/projects/:id' element={<TodoList items={this.state.todo} />} />
          <Route path='/projects/info/:id' element={<ProjectPage projects={this.state.projects} />} />
         
          <Route exact path="*" element={<NotFound404 location={window.location} />} />
          <Route path='/users' element={<Navigate to="/"/>}/>
        </Routes>
          <Footer />
      </BrowserRouter>
      </div>

    )
  }
}

export default App;
