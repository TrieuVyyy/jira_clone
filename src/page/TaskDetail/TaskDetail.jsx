import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Tag, message, Select } from "antd";
import { SendOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { https } from "../../service/api";
import TaskType from "../CreateTask/TaskType";
import ListComment from "./TaskComment/ListComment";
import Status from "../CreateTask/Status";
import Priority from "../CreateTask/Priority";
import TimeTracking from "../CreateTask/TimeTracking";
import Assignees from "../CreateTask/Assignees";

export default function TaskDetail(props) {
  const { value, show, handleCancel, refreshProjectDetail } = props;
  const [taskDetail, setTaskDetail] = useState([]);
  const [formData, setFormData] = useState();
  const [showCKE, setShowCKE] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);

  const fetchTaskDetail = () => {
    https
      .get(`/api/Project/getTaskDetail?taskId=${value}`)
      .then((res) => {
        console.log(res.data);
        setTaskDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTaskDetail();
  }, [value]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.issue]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setFormData();
    setShowCKE(false);
  };

  //xóa task
  const handelDeleteTask = () => {
    https
      .delete(`/api/Project/removeTask?taskId=${value}`)
      .then((res) => {
        message.success("Delete successful");
        handleCancel();
        refreshProjectDetail();
      })
      .catch((err) => {
        message.error("Delete failed");
      });
  };

  //xóa user khỏi task
  const handleRemoveUser = (userId) => {
    const user = {
      taskId: taskDetail.taskId,
      userId,
    };
    https
      .post(`/api/Project/removeUserFromTask?taskId`, user)
      .then((res) => {
        message.success("User removed successfully");
        fetchTaskDetail();
      })
      .catch((err) => {
        message.error("Failed to remove user");
      });
  };

  const toggleAssignees = () => {
    setShowAssignees(!showAssignees);
  };

  //thêm user trong task
  const handleAssignUserTask = (userId, taskId) => {
    const user = {
      taskId,
      userId,
    };
    https
      .post(`/api/Project/assignUserTask?taskUser`, user)
      .then((res) => {
        console.log(res.data);
        fetchTaskDetail();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      open={show}
      onCancel={handleCancel}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ minWidth: "1000px" }}
    >
      <div className="flex justify-between space-x-5">
        <div className="form-left">
          <div className="flex items-center pb-2 space-x-3">
            <TaskType
              value={taskDetail?.taskTypeDetail?.id}
              name="taskTypeDetail"
              onSelect={handleSelect}
              defaultValue={taskDetail?.taskTypeDetail?.id}
            />
            <span>{taskDetail?.taskName}</span>
          </div>

          <div className="py-2">
            <textarea
              className="text-xl font-semibold"
              style={{ width: "100%" }}
            >
              This is an issue of Type:
            </textarea>
          </div>

          <label className="text-sm font-medium pb-3">Description</label>
          <div>
            {showCKE ? (
              <>
                <CKEditor
                  editor={ClassicEditor}
                  data={taskDetail?.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTaskDetail({ ...taskDetail, description: data });
                    setFormData({ ...formData, description: data });
                  }}
                />
                <div className="flex space-x-5 pt-2">
                  <Button type="primary" className="bg-blue-600" size="small">
                    Save
                  </Button>
                  <Button size="small" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <textarea
                onFocus={() => setShowCKE(true)}
                onBlur={() => setShowCKE(false)}
                value={taskDetail?.description}
                name="description"
                onChange={handleOnChange}
                placeholder="Add a description..."
                style={{ width: "100%" }}
              />
            )}
          </div>

          <label className="text-sm font-medium py-3">Comments</label>
          <ListComment taskId={taskDetail?.taskId} />
        </div>
        <div className="form-right mr-8">
          <div className="flex justify-start space-x-2">
            <button className="px-2 py-1 rounded hover:bg-gray-200">
              <SendOutlined />
              Give feedback
            </button>
            <button className="px-2 py-1 rounded hover:bg-gray-200">
              <LinkOutlined /> Copy link
            </button>
            <button
              onClick={handelDeleteTask}
              className="px-2 py-1 rounded hover:bg-gray-200"
            >
              <DeleteOutlined />
            </button>
          </div>
          <label className="text-sm font-medium py-3">STATUS</label>
          <Status
            value={taskDetail?.statusId}
            name="statusId"
            onSelect={handleSelect}
            defaultValue={taskDetail?.statusId}
          />

          <label className="text-sm font-medium py-3">ASSIGNESS</label>
          <div>
            {taskDetail?.assigness?.map((user, index) => (
              <Tag key={index} className="px-2 py-1 space-x-2">
                <Avatar size="small" src={user.avatar} />
                {user.name}
                <button
                  onClick={() => handleRemoveUser(user.id)}
                  className="text-gray-600"
                >
                  X
                </button>
              </Tag>
            ))}
            {showAssignees && (
              <Assignees
                projectId={taskDetail?.projectId}
                onSelect={handleAssignUserTask}
              />
            )}

            <button className="text-blue-600 pt-2" onClick={toggleAssignees}>
              {showAssignees ? "Close" : "+ Add more"}
            </button>
          </div>

          <label className="text-sm font-medium py-3">PRIORITY</label>
          <Priority
            value={taskDetail?.priorityTask?.priorityId}
            name="taskTypeDetail"
            onSelect={handleSelect}
            defaultValue={taskDetail?.priorityTask?.priorityId}
          />

          <label className="text-sm font-medium py-3">
            ORIGINAL ESTIMATE (HOURS)
          </label>
          <input
            value={taskDetail?.originalEstimate}
            name="originalEstimate"
            type="number"
            min="0"
            style={{ width: "100%" }}
            className="form-control"
            onChange={handleOnChange}
          />

          <label className="text-sm font-medium py-3">TIME TRACKING</label>
          <TimeTracking
            value={taskDetail?.timeTrackingSpent}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </Modal>
  );
}
