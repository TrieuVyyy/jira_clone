import React, { useEffect, useState } from "react";
import { https } from "../../../../service/api";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import TaskDetail from "../../TaskDetail/TaskDetail";
import Badge from "react-bootstrap/Badge";

export default function CardTask() {
  const [status, setStatus] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const handleClose = () => {
    setModalShow(false);
  };
  const handleShow = () => {
    setModalShow(true);
  };

  useEffect(() => {
    https
      .get("/api/Status/getAll")
      .then((res) => {
        setStatus(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="grid lg:grid-cols-4 gap-3">
      {status.map((item) => (
        <Card
          key={item.statusId}
          style={{
            width: "100%",
            backgroundColor: "gainsboro",
          }}
        >
          <Card.Body>
            <Card.Title>
              <div className="d-flex">
                {item.statusName}
                <Badge
                  className="ml-2 justify-center align-items-center"
                  style={{ width: "5px" }}
                  pill
                  bg="secondary"
                >
                  0
                </Badge>
              </div>
            </Card.Title>
            <ListGroup variant="flush">
              <ListGroupItem action onClick={handleShow}>
                <TaskDetail show={modalShow} onHide={handleClose} />
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
