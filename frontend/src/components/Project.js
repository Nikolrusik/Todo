import React from "react";
import { Link, useParams } from "react-router-dom";



const ProjectItem = ({ item }) => {
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
    </tr>
  );
};

const ProjectList = ({ items }) => {
 
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
        <ProjectItem item={item} />
      ))}
    </table>
  );}

export default ProjectList;
