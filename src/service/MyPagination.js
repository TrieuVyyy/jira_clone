import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { https } from "./api";
import { message } from "antd";
import CategoryProject from "../page/CreateProject/CategoryProject";


export default function MyPagination(props) {
  const { data } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  const [isEditOpen, setIsEditOpen] = useState(false); 
  const [editedProject, setEditedProject] = useState({})

  useEffect(() => {
    const endOffSet = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffSet));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  const handleDelete = (id) => {
    https
      .delete(`/api/Project/deleteProject?projectId=${id}`)
      .then((res) => {
        message.success("Project deleted successfully");
        setCurrentItems();
      })
      .catch((err) => {
        message.error("Failed to delete project");
      });
  };

  const handleEdit = (id) => {
    const projectToEdit = data.find((project) => project.id === id);
    if (projectToEdit) {
      setEditedProject(projectToEdit);
      setIsEditOpen(true); // Open edit mode
    } else {
      console.error("Project not found for editing:", id);
    }
  };

  const handleUpdate = () => {
    if (!editedProject.id) {
      console.error("Missing project ID for update");
      return;
    }
    https
      .put(`/api/Project/updateProject${editedProject.id}`, editedProject)
      .then((res) => {
        console.log(res);
        message.success("Update successful");
        setIsEditOpen(false); // Close edit mode
      })
      .catch((err) => {
        console.log(err);
        message.error("Error updating project");
      });
  };

  const handleInputChange = (event, field) => {
    setEditedProject({ ...editedProject, [field]: event.target.value });
  };

  return (
    <>
      <div className="projectlist">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Project Category</th>
              <th>Description</th>
              <th>Creator</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((project) =>
              isEditOpen && project.id === editedProject.id  ? (
                <tr>
                  <td>{project.id}</td>
                  <td>
                    <input
                      type="text"
                      value={editedProject.projectName}
                      onChange={(e) => handleInputChange(e, "projectName")}
                    />
                  </td>
                  <td>
                    <CategoryProject
                      value={editedProject.categoryName}
                      onChange={(e) => handleInputChange(e, "categoryName")}
                    />
                  </td>
                  <td>
                    <input
                      type=""
                      value={editedProject.description}
                      onChange={(e) => handleInputChange(e, "description")}
                    />
                  </td>
                  <td style={{ color: "gray" }}>
                    {project.creator && project.creator.name}
                  </td>
                  <td>
                    <button onClick={handleUpdate} className="btn btn-info">
                      Update
                    </button>
                    <button onClick={() => setIsEditOpen(false)} className="btn btn-outline-secondary btn-sm">
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td style={{ color: "orangered" }}>{project.projectName}</td>
                  <td style={{ color: "olivedrab" }}>{project.categoryName}</td>
                  <td>{project.description}</td>
                  <td style={{ color: "gray" }}>
                    {project.creator && project.creator.name}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEdit(project.id)}
                      className="btn btn-outline-info mr-2 btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      </div>

      <ReactPaginate
        className="d-flex justify-center text-lg gap-3"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-num"
        previousClassName="page-num"
        nextClassName="page-num"
        activeLinkClassName="actives"
      />
    </>
  );
}
