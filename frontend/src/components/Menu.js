import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <div className='menu'>
            <div className="menu_item">
                <Link to="/login">Войти</Link>
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
}

export default Menu