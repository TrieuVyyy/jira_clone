import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { Breadcrumb, Avatar, Button, Input, Card, List } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import TaskDetail from "../TaskDetail/TaskDetail";

export default function ProjectDetail() {
  const [detail, setDetail] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [showingTaskId, setShowingTaskId] = useState(null);

  let { id } = useParams();

  const handleModalOpen = (taskId) => {
    setModalShow(true);
    setShowingTaskId(taskId);
  };

  const fetchProjectDetail = () => {
    https
      .get(`/api/Project/getProjectDetail?id=${id}`)
      .then((res) => {
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);
  const handleClose = () => {
    setModalShow(false);
  };

  return (
    <div className="detail-page">
      <div className="header">
        <div>
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Project</Breadcrumb.Item>
            <Breadcrumb.Item>Cyber Board</Breadcrumb.Item>
            <Breadcrumb.Item>{detail?.projectName}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <h1 className="text-2xl font-bold">{detail?.projectName}</h1>
        <div className="flex pb-5">
          <Input
            prefix={<SearchOutlined />}
            style={{ width: "30%" }}
            className="mr-5"
          />
          <Avatar.Group
            maxCount={3}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            {detail?.members?.map((member, index) => (
              <Avatar key={index} src={member.avatar} />
            ))}
          </Avatar.Group>

          <Button
            style={{
              margin: "0 16px",
              verticalAlign: "middle",
            }}
          >
            Only My Issues
          </Button>
          <Button
            style={{
              verticalAlign: "middle",
            }}
          >
            Recently Updated
          </Button>
        </div>
      </div>
      <div className="cardTask grid grid-cols-2 lg:grid-cols-4 gap-2">
        {detail?.lstTask?.map((task, index) => (
          <Card
            key={index}
            title={task.statusName}
            bordered={false}
            style={{
              width: "100%",
              backgroundColor: "gainsboro",
            }}
          >
            <List
              style={{
                cursor: "pointer",
                background: "white",
              }}
              className="space-y-5"
            >
              {task.lstTaskDeTail.map((taskDetail) => (
                <List.Item
                  key={taskDetail.taskId}
                  actions
                  onClick={() => handleModalOpen(taskDetail.taskId)}
                  className="flex flex-col space-y-4 shadow-md hover:shadow-xl"
                >
                  <span>{taskDetail.taskName}</span>
                  <div className="flex justify-between items-center space-x-9">
                    <span className="text-red-600 text-xs">
                      {taskDetail.priorityTask.priority}
                    </span>
                    <Avatar.Group
                    size="small"
                      maxCount={1}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {taskDetail.assigness.map((member, index) => (
                        <Avatar size="small" key={index} src={member.avatar} />
                      ))}
                    </Avatar.Group>
                  </div>
                </List.Item>
              ))}
            </List>
          </Card>
        ))}
      </div>
      <TaskDetail
        value={showingTaskId}
        show={modalShow}
        handleCancel={handleClose}
        refreshProjectDetail={fetchProjectDetail}
      />
    </div>
  );
}
