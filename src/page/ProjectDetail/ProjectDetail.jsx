import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { Breadcrumb, Avatar, Button, Input, Card, List } from "antd";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";
import TaskDetail from "../TaskDetail/TaskDetail";

export default function ProjectDetail() {
  const [detail, setDetail] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [taskList, setTaskList] = useState([]);

  let { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    https
      .get(`/api/Project/getProjectDetail?id=${id}`)
      .then((res) => {
        console.log(res);
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => {
    setModalShow(true);
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
      <div className="cardTask grid grid-cols-2 lg:grid-cols-4 gap-8">
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
            <List style={{ cursor: "pointer", background: "white" }}>
              <List.Item actions onClick={showModal}>
                <TaskDetail
                  value={task.taskId}
                  show={isModalOpen}
                  onHide={handleClose}
                />
              </List.Item>
            </List>
          </Card>
        ))}
      </div>
    </div>
  );
}
