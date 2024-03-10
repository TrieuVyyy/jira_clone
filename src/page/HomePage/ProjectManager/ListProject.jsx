import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";
import { message } from "antd";
import MyPagination from "../../../service/MyPagination";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListProject() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        console.log(res);
        setProjectList(res.data.content);
        message.success("Get data successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container p-5">
      <MyPagination data = {projectList}/>
    </div>
  );
}
