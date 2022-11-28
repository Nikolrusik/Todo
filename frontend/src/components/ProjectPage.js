import React from "react";
import { Link, useParams } from "react-router-dom";

const ProjectPageItem = ({ project }) => {
  return (
    <div className="users">
      <h1>{project.name}</h1>
      <p>{project.name}</p>
      <p>{project.users}</p>
    </div>
  );
};
const ProjectPage = ({ projects }) => {
  let { id } = useParams();
  let filtered_projects = projects.filter((project) => project.id == id);
  return (
    <div>
      {filtered_projects.map((project) => (
        <ProjectPageItem project={project} />
      ))}
    </div>
  );
};

export default ProjectPage;
