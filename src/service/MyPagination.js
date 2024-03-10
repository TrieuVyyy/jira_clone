import React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { https } from "./api";
import { message } from "antd";

export default function MyPagination(props) {
  const { data, fetchData } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffSet = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffSet));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

//   const handleDelete = (id) => {
//     https
//       .delete(`/api/Project/deleteProject/${id}`)
//       .then((res) => {
//         console.log(res);
//         message.success("Delete successfully");
//         //gọi lại api lấy ds product mới nhất từ server
      
//     })
//       .catch((err) => {
//         message.error("Error occurred");
//         console.log(err);
//       });
//   };

const handleDelete = (id) => {
    // Send delete request to API
    https.delete(`/api/Project/getAllProject/${id}`)
      .then(() => {
        // Display success message
        message.success("Project deleted successfully");
        // Fetch latest data
        fetchData();
      })
      .catch((error) => {
        // Display error message if deletion fails
        message.error("Failed to delete project");
        console.error("Delete error:", error);
      });
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
            {currentItems.map((project) => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td style={{ color: "orangered" }}>{project.projectName}</td>
                <td style={{ color: "olivedrab" }}>{project.categoryName}</td>
                <td style={{ color: "olivedrab" }}>{project.description}</td>
                <td style={{ color: "gray" }}>
                  {project.creator && project.creator.name}
                </td>
                <td>
                  <button className="btn btn-outline-success mr-2 btn-sm">
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
            ))}
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
