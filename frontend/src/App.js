import "./App.css";
import React from "react";
import axios from "axios";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

// Componenets
import UsersList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import ProjectPage from "./components/ProjectPage";
import TodoList from "./components/ProjectItem";

const NotFound404 = ({ location }) => {
  return (
    <div>
      <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      projects: [],
      todo: [],
    };
  }
  
  load_data = () => {
    // get User
    axios
      .get("http://127.0.0.1:8000/api/users")
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => console.log(error));
    // get Project
    axios
      .get("http://localhost:8000/api/projects/")
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => console.log(error));
    // get Todo
    axios
      .get("http://localhost:8000/api/todo/")
      .then((response) => {
        this.setState({
          todo: response.data,
        });
      })
      .catch((error) => console.log(error));
  }
  componentDidMount() {
     this.load_data();
  }   
  
  render() {  
      return (
        <div>
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route
              
                path="/"
                element={<UsersList users={this?.state?.users} />}
              />
              <Route
              
                path="/projects"
                element={<ProjectList items={this?.state?.projects} />}
              />
              <Route
              
                path="/projects/:id"
                element={<TodoList items={this?.state?.todo} />}
              />
              <Route
                path="/projects/info/:id"
                element={<ProjectPage projects={this?.state?.projects} />}
              />
              <Route
                exact
                path="*"
                element={<NotFound404 location={window?.location} />}
              />
              <Route path="/users" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      );
      
    }
  }


export default App;
