import React, { useState, useEffect } from "react";
import { https } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, message, Select } from "antd";
import TaskType from "./TaskType";
import Assignees from "./Assignees";
import Priority from "./Priority";
import Status from "./Status";
import TimeTracking from "./TimeTracking";

export default function CreateTask() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [formData, setFormData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        setProjectList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (value) => {
    // console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    // console.log("search:", value);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //tạo task mới
  const handleCrate = (e) => {
    e.preventDefault();
    // if (!user) {
    //   message.error("You are not authorized to create tasks");
    //   return;
    // }

    const isDuplicate = projectList.some(
      (project) => project.projectName === formData.projectName
    );
    if (isDuplicate) {
      message.error("Task name already exists");
      return;
    }
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
    <div className="container">
      <h1 className="font-bold text-2xl text-gray-500">Create Task</h1>
      <form className="space-y-2">
        <label className="text-sm font-sans pt-3">Project</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: "100%" }}
          placeholder="Search Project..."
          onChange={onChange}
          onSearch={onSearch}
        >
          {projectList.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.projectName}
            </Select.Option>
          ))}
        </Select>

        <label className="text-sm font-sans pt-2">Task Name</label>
        <input
          style={{ width: "100%" }}
          className="form-control"
          name="projectName"
          onChange={handleChange}
        />

        <label className="text-sm font-sans pt-2">Status</label>
        <Status onChange={handleChange} />

        <div className="flex space-x-12 pt-2">
          <div className="form-left w-full space-y-2">
            <label className="text-sm font-sans pt-2">Priority</label>
            <Priority onChange={handleChange} />

            <label className="text-sm font-sans pt-2">Assignees</label>
            <Assignees onChange={handleChange} />

            <label className="text-sm font-sans pt-2">
              Original Estimate
            </label>
            <input
              type="number"
              min="0"
              style={{ width: "100%" }}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-right w-full space-y-2">
            <label className="text-sm font-sans pt-2">Task Type</label>
            <TaskType onChange={handleChange} />

            <label className="text-sm font-sans pt-2">Time Tracking</label>
            <TimeTracking />
          </div>
        </div>

     
          <label className="text-sm font-sans pt-2">Description</label>
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
