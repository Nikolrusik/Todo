import React from 'react';

const UserItem = ({user}) => {
    return(
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UsersList = ({users}) => {
    return(
        <table>
            <th>
            First name
            </th>
            <th>
            Last Name
            </th>
            <th>
            Age
            </th>
            <th>
            Email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UsersList