import React from "react";
import { useParams } from "react-router-dom";

const TodoItem = ({ item }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.note}</td>
      <td>{item.description}</td>
      <td>{item.project.name}</td>
      <td>{item.created_at}</td>
      <td>{item.updated_at}</td>
      <td>{item.is_active ? "Yes" : "No"}</td>
      <td>{item.user}</td>
    </tr>
  );
};
const TodoList = ({ items }) => {
  let { id } = useParams();
  let filtered_items = items.results?.filter((item) => item.project.id == id);
  return (
    <table>
      <tr>
        <th>ID</th>
        <th>Note</th>
        <th>Description</th>
        <th>project</th>
        <th>Created</th>
        <th>Updated</th>
        <th>Active</th>
        <th>User</th>
      </tr>
      {filtered_items?.map((item) => (
        <TodoItem item={item} />
      ))}
    </table>
  );
};
export default TodoList;
