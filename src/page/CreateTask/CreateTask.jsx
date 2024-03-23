import React, { useState, useEffect } from "react";
import { https } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, message } from "antd";
import TaskType from "../TaskDetail/TaskType";
import Reporter from "../TaskDetail/Reporter";
import Assignees from "../TaskDetail/Assignees";
import Priority from "../TaskDetail/Priority";


export default function CreateTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    console.log(e)
    setFormData({ ...formData, [e.target.select]: e.target.value });
  };

  const handleCrate = () => {
    https
      .post("/api/Project/createTask", formData)
      .then((res) => {
        navigate("/");
        setFormData(res.data.content);
        message.success("Create new task successfully");
      })
      .catch((err) => {
        message.error("Failed to create task");
      });
  };

  return (
    <div className="container pt-10">
      <h1 className="font-bold text-2xl ml-5 text-gray-500">Create Task</h1>
      <form className="container">
        <div className="form-group p-2">
          <label className="text-sm font-light pb-2">Task Type</label>
          <TaskType onChange={handleChange} />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light pb-2">Short Summary</label>
          <input
            style={{ width: "100%" }}
            className="form-control"
            name="projectName"
            onChange={handleChange}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light">Description</label>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {}}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, description: data });
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light pb-2">Reporter</label>
          <Reporter onChange={handleChange} />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light pb-2">Assignees</label>
          <Assignees onChange={handleChange} />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light pb-2">Priority</label>
          <Priority onChange={handleChange} />
        </div>

        <Button
          className="bg-green-700 mt-3"
          type="primary"
          htmlType="submit"
          style={{ color: "#fff" }}
          onClick={handleCrate}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
