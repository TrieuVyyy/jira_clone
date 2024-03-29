import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { message } from "antd";
import MyPagination from "../../service/MyPagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ListProject() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        setProjectList(res.data.content);
        message.success("Get data successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h3 className="mt-5 text-gray-500">Projects List</h3>
      <div className="d-flex justify-content-end">
        <Link to='/create' className="btn btn-success my-4" >+ Add Project</Link>
      </div>

      <MyPagination data={projectList} />
    </div>
  );
}
