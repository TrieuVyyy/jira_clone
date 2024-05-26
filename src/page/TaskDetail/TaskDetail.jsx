import React, { useEffect, useState } from "react";
import { Avatar, Button, Modal, Tag, message, Popover, List } from "antd";
import { SendOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { https } from "../../service/api";
import TaskType from "../CreateTask/TaskType";
import ListComment from "./TaskComment/ListComment";
import Status from "../CreateTask/Status";
import Priority from "../CreateTask/Priority";
import TimeTracking from "../CreateTask/TimeTracking";

export default function TaskDetail(props) {
  const {
    value,
    show,
    handleCancel,
    refreshProjectDetail,
    listMember,
  } = props;
  const [taskDetail, setTaskDetail] = useState([]);
  const [formData, setFormData] = useState([]);
  const [showCKE, setShowCKE] = useState(false);

  const fetchTaskDetail = () => {
    https
      .get(`/api/Project/getTaskDetail?taskId=${value}`)
      .then((res) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setFormData([]);
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
      .post("/api/Project/removeUserFromTask", user)
      .then((res) => {
        message.success("User removed successfully");
        fetchTaskDetail();
      })
      .catch((err) => {
        message.error("Failed to remove user");
      });
  };

  const availableMembers = listMember
    ? listMember.filter(
        (member) =>
          !taskDetail.assigness?.some(
            (assignee) => assignee.id === member.userId
          )
      )
    : [];

  //thêm user trong task
  const handleAssignUserTask = (userId) => {
    const assignUser = {
      taskId: taskDetail.taskId,
      userId,
    };
    https
      .post("/api/Project/assignUserTask", assignUser)
      .then((res) => {
        message.success("Added successfully");
        setTaskDetail((prevState) => ({
          ...prevState,
          assigness: [
            ...prevState.assigness,
            {
              id: userId,
              ...availableMembers.find((member) => member.userId === userId),
            },
          ],
        }));
        fetchTaskDetail();
        refreshProjectDetail();
      })
      .catch((err) => {
        message.error("You are not creator");
      });
  };

  //update Status
  const handleUpdateStatus = (e) => {
    const statusId = e.target.value;
    const status = {
      taskId: taskDetail.taskId,
      statusId,
    };
    https
      .put("/api/Project/updateStatus", status)
      .then((res) => {
        setTaskDetail((prevState) => ({
          ...prevState,
          statusId,
        }));
        message.success("Updated successfully");
        refreshProjectDetail();
      })
      .catch((err) => {
        message.error("Failed to update ");
      });
  };

  //update Priority
  const handleUpdatePriority = (e) => {
    const priorityId = e.target.value;
    const priority = {
      taskId: taskDetail.taskId,
      priorityId,
    };

    https
      .put("/api/Project/updatePriority", priority)
      .then((res) => {
        setTaskDetail((prevState) => ({
          ...prevState,
          priorityTask: {
            ...prevState.priorityTask,
            priorityId,
          },
        }));
        message.success("Updated successfully");
        refreshProjectDetail();
      })
      .catch((err) => {
        message.error("You are not assigned");
      });
  };

  //update Des
  const handleUpdateDes = () => {
    const updatedDescription = formData.description;
    const des = {
      taskId: taskDetail.taskId,
      description: updatedDescription,
    };

    https
      .put("/api/Project/updateDescription", des)
      .then((res) => {
        message.success('"Updated successfully"');
        setShowCKE(false);
        fetchTaskDetail();
      })
      .catch((err) => {
        message.error("Failed to update ");
        console.log(err);
      });
  };

  //update ORIGINAL ESTIMATE
  const handleUpdateEstimate = () => {
    const updatedEstimate = formData.originalEstimate;
    const estimate = {
      taskId: taskDetail.taskId,
      originalEstimate: updatedEstimate,
    };

    https
      .put("/api/Project/updateEstimate", estimate)
      .then((res) => {
        message.success('"Updated successfully"');
        fetchTaskDetail();
      })
      .catch((err) => {
        message.error("You are not assigned");
        console.log(err);
      });
  };

  //update Time Tracking
  const handleUpdateTimeTracking = (timeTrackingData) => {
    const time = {
      taskId: taskDetail.taskId,
      timeTrackingSpent: timeTrackingData.timeSpent,
      timeTrackingRemaining: timeTrackingData.timeRemaining,
    };

    https
      .put("/api/Project/updateTimeTracking", time)
      .then((res) => {
        message.success('"Updated successfully"');
        fetchTaskDetail();
      })
      .catch((err) => {
        message.error("You are not assigned");
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
              name="taskTypeDetail"
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
                    setFormData({ ...formData, description: data });
                  }}
                />
                <div className="flex space-x-5 pt-2">
                  <Button
                    onClick={handleUpdateDes}
                    type="primary"
                    className="bg-blue-600"
                    size="small"
                  >
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
            onSelect={handleUpdateStatus}
            name="statusId"
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

            <Popover
              trigger="click"
              content={
                <List
                  style={{
                    width: "200px",
                    maxHeight: "200px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                  dataSource={availableMembers}
                  renderItem={(listMember) => (
                    <List.Item
                      key={listMember.userId}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleAssignUserTask(listMember.userId)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={listMember.avatar} />}
                        title={listMember.name}
                      />
                    </List.Item>
                  )}
                />
              }
            >
              <Button className="text-blue-500">+Add more</Button>
            </Popover>
          </div>

          <label className="text-sm font-medium py-3">PRIORITY</label>
          <Priority
            onSelect={handleUpdatePriority}
            name="priorityId"
            defaultValue={taskDetail?.priorityTask?.priorityId}
          />

          <label className="text-sm font-medium py-3">
            ORIGINAL ESTIMATE (HOURS)
          </label>
          <input
            value={formData.originalEstimate || taskDetail?.originalEstimate}
            name="originalEstimate"
            type="number"
            min="0"
            style={{ width: "100%" }}
            className="form-control"
            onChange={handleOnChange}
            onBlur={handleUpdateEstimate}
          />

          <label className="text-sm font-medium py-3">TIME TRACKING</label>
          <TimeTracking
            timeSpent={taskDetail?.timeTrackingSpent}
            timeRemaining={taskDetail?.timeTrackingRemaining}
            onChange={handleUpdateTimeTracking}
          />

          <hr />
          <p className="text-xs text-gray-500">Create at 2 months ago</p>
          <p className="text-xs text-gray-500">Updated at 9 days ago</p>
        </div>
      </div>
    </Modal>
  );
}
