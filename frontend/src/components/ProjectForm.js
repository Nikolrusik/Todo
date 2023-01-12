import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '',  link: '', users: [], users_id: []}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.link,this.state.users, this.state.users_id)
        event.preventDefault()
    }

    add_user(event) {
        if (!this.state.users.includes(...this?.props?.users?.results.filter((user) => user.id == event.target.id ))) {
        this.setState(
            {
                users:  [...this.state.users, ...this?.props?.users?.results.filter((user) => user.id == event.target.id )],
                users_id:  [...this.state.users_id, ...event.target.id]
            }
        )
        }
    }
    del_user(event) {
        this.setState(
            {
                users:  [...this.state.users.filter((user) => user.id != event.target.id )],
                users_id:  [...this.state.users_id.filter((user) => user != event.target.id )]
            }
        )
    }
    render() {
        return (
        <form id="projectForm" onSubmit={ (event)=>this.handleSubmit(event)}>
            <div className="users_container">
                <div className="all_users">
                    <h3>All users</h3>
                {this?.props?.users?.results?.map((user) => (
                    <p onClick={ (event)=>this.add_user(event)} id={'' + user.id}>{user.username} | {user.email}</p>
      ))}
                    
                </div>
                <div className="selected_users">
                <h3>Selected users</h3>
                {this?.state?.users?.map((user) => (
                    <p onClick={ (event)=>this.del_user(event)} id={'' + user.id}>{user.username} | {user.email}</p>
      ))}
                </div>
            </div>
        <input form="projectForm" name="name" placeholder="Name project" type="text" onChange={(event)=> this.handleChange(event)}  value={this.state.name}></input>
        <input form="projectForm" name="link" placeholder="Link project" type="text" onChange={(event)=> this.handleChange(event)}  value={this.state.link}></input>

        <button form="projectForm" type="submit" >Добавить</button>
     </form>
        )    
}
}

export default ProjectForm;