import React, { useState, useEffect } from "react";
import { https } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button, message, Select } from "antd";
import { useSelector } from "react-redux";
import TaskType from "./TaskType";
import Assignees from "./Assignees";
import Priority from "./Priority";
import Status from "./Status";
import TimeTracking from "./TimeTracking";

export default function CreateTask() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState([]);
  const [formData, setFormData] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const [selectedProjectId, setSelectedProjectId] = useState();
  const user = useSelector((state) => state.userSlice.user);

  useEffect(() => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        const myProject = res.data.content.filter(
          (item) => item.creator.id == user.id
        );
        setProjectList(myProject);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSelectProject = (value) => {
    setFormData({ ...formData, projectId: value });
    setSelectedProjectId(value);
  };

  const onSelectAssignees = (user) => {
    setFormData({ ...formData, listUserAsign: user });
  };

  const handleChange = (e) => {
    if (!e.target || !e.target.name) {
      return;
    }
    const isNumber =
      e.target.name === "originalEstimate" ||
      e.target.name === "timeTrackingSpent" ||
      e.target.name === "timeTrackingRemaining" ||
      e.target.name === "priorityId" ||
      e.target.name === "typeId";

    const value = isNumber ? parseInt(e.target.value) : e.target.value;

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleTimeTrackingChange = ({ timeSpent, timeRemaining }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      timeTrackingSpent: timeSpent,
      timeTrackingRemaining: timeRemaining,
    }));
  };

  //tạo task mới
  const handleCreate = () => {
    const defaultCheckedName = ["priorityId", "typeId", "statusId"];
    defaultCheckedName.forEach((e) => {
      if (!formData.hasOwnProperty(e)) {
        formData[e] = 1;
      }
    });
    https
      .post("/api/Project/createTask", formData)
      .then((res) => {
        const projectId = formData.projectId;
        setFormData(res.data.content);
        message.success("Create new task successfully");
        navigate(`/project-detail/${projectId}`);
      })
      .catch((err) => {
        message.error("Failed to create task");
      });
  };

  return (
    <div className="container">
      <h1 className="font-bold text-2xl text-gray-500">Create Task</h1>
      <form className="space-y-2">
        <label className="text-sm font-medium pt-3">Project</label>
        <Select
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          style={{ width: "100%" }}
          placeholder="Search Project..."
          onChange={onSelectProject}
        >
          {projectList.map((project) => (
            <Select.Option key={project.id} value={project.id}>
              {project.projectName}
            </Select.Option>
          ))}
        </Select>

        <label className="text-sm font-medium pt-2">Task Name</label>
        <input
          style={{ width: "100%" }}
          className="form-control"
          name="taskName"
          onChange={handleChange}
        />

        <label className="text-sm font-medium pt-2">Status</label>
        <Status onSelect={handleChange} />

        <div className="flex space-x-12 pt-2">
          <div className="form-left w-full space-y-2">
            <label className="text-sm font-medium pt-2">Priority</label>
            <Priority onSelect={handleChange} />

            <label className="text-sm font-medium pt-2">Assignees</label>
            <Assignees
              onSelect={onSelectAssignees}
              projectId={selectedProjectId}
            />

            <label className="text-sm font-medium pt-2">
              Original Estimate
            </label>
            <input
              name="originalEstimate"
              type="number"
              min="0"
              style={{ width: "100%" }}
              className="form-control"
              onChange={handleChange}
            />
          </div>

          <div className="form-right w-full space-y-2">
            <label className="text-sm font-medium pt-2">Task Type</label>
            <TaskType onSelect={handleChange} />

            <label className="text-sm font-medium pt-2">Time Tracking</label>
            <TimeTracking
              onChange={handleTimeTrackingChange}
              timeSpent={formData.timeTrackingSpent}
              timeRemaining={formData.timeTrackingRemaining}
            />
          </div>
        </div>

        <label className="text-sm font-medium pt-2">Description</label>
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
          style={{ color: "#fff" }}
          onClick={handleCreate}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
