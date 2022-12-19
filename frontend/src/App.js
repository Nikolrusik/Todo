import "./App.css";
import React from "react";
import axios from "axios";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

// Componenets
import UsersList from "./components/User";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from "./components/Project";
import ProjectPage from "./components/ProjectPage";
import TodoList from "./components/ProjectItem";
import LoginForm from "./components/Auth";

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
      token: "",
    };
  }

  // Set token
  set_token(token) {
    const cookies = new Cookies();
    cookies.set("token", token);
    this.setState({ token: token }, ()=>this.load_data());
  }

  is_authenticated() {
    return this.state.token != "";
  }

  logout() {
    this.set_token("");
  }

  get_token_from_storage() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    this.setState({ token: token }, ()=>this.load_data());
  }

  // Get headers
  get_headers() {
    let headers = {
      "Content-Type": "application/json",
    };
    if (this.is_authenticated()) {
      headers["Authorization"] = "Token " + this.state.token;
    }
    return headers;
  }

  // Get token
  get_token(username, password) {
    axios
      .post("http://127.0.0.1:8000/api-token-auth/", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        this.set_token(response.data["token"]);
      })
      .catch((error) => alert("Неверный логин или пароль"));
  }
  // Get data
  load_data() {
    // get User
    const headers = this.get_headers()
    axios
      .get("http://127.0.0.1:8000/api/users", {headers})
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          users: [],
        })
      } );
    // get Project
    axios
      .get("http://localhost:8000/api/projects/", {headers})
      .then((response) => {
        this.setState({
          projects: response.data,
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          projects: [],
        });
      } );
    // get Todo
    axios
      .get("http://localhost:8000/api/todo/", {headers})
      .then((response) => {
        this.setState({
          todo: response.data,
        });
      })
      .catch((error) => {
        console.log(error)
        this.setState({
          todo: [],
        });
      });
  };

  componentDidMount() {
    this.get_token_from_storage();
    // this.load_data();
  }

  render() {
    console.log(this.is_authenticated());
    return (
      <div>
        <BrowserRouter>
          {this.is_authenticated()}
          <Menu
            is_authenticated={this.is_authenticated.bind(this)}
            logout={this.logout.bind(this)}
          />
          <Routes>
            <Route
              path="/login"
              element={
                <LoginForm
                  get_token={(username, password) =>
                    this.get_token(username, password)
                  }
                />
              }
            />
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
