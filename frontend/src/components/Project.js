import React from 'react';

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.link}</td>
            <td>{item.users}</td>
        </tr>
    )
}

const ProjectList = ({items}) => {
    return (
        <table>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Link</td>
                <td>Users</td>
            </tr>
            {items.map((item) => <ProjectItem item ={item} />)}
        </table>
    )
}

export default ProjectList;