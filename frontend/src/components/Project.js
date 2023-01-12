import React from "react";
import { Link, useParams } from "react-router-dom";



const ProjectItem = ({ item, deleteProject }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>
        <Link to={`/projects/info/${item.id}`}>{item.name}</Link>
      </td>
      <td>{item.link}</td>
      <td>{item.users}</td>
      <td>
        <Link to={`/projects/${item.id}`}>Notes</Link>
      </td>
      <td><button onClick={() => deleteProject(item.id)}>Delete</button></td>
    </tr>
  );
};

const ProjectList = ({ items, deleteProject }) => {
 
  return (
    <table>
      <tr>
        <td>ID</td>
        <td>Name</td>
        <td>Link</td>
        <td>Users</td>
        <td>Link Notes</td>
      </tr>
      {items?.results?.map((item) => (
        <ProjectItem 
        item={item} 
        deleteProject={deleteProject.bind(this)}
        />
      ))}
      <tr>
        <td><Link to={`/projects/create/`}>Add projects</Link></td>
        
      </tr>
    </table>
  );}

export default ProjectList;
