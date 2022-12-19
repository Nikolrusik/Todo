import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
    return(
        <div className='menu'>
            <div className="menu_item">
                {this.props.is_authenticated() ?  <button
onClick={()=> this.props.logout()}>Logout</button> : <Link to="/login">Войти</Link>}
                
                </div>
            <div className="menu_item">
                <Link to="/users">Список пользователей</Link>
                </div>
            <div className="menu_item">
                <Link to="/projects">Проекты</Link>
            </div>
            <div className="menu_item">
                <Link to="/admin">Администрирование</Link>
                </div>
        </div>
    )
}}

export default Menu