import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form, Container } from "react-bootstrap";
import {
  BsFillSendPlusFill,
  BsLink45Deg,
  BsFillTrash3Fill,
  BsAlarmFill,
} from "react-icons/bs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TaskType from "./TaskType";
// import { https } from "../../../service/api";
import TaskStatus from "./TaskStatus";
import Assignees from "./Assignees";
import Comment from "./TaskComment/Comment";
import Reporter from "./Reporter";
import Priority from "./Priority";
import ListComment from "./TaskComment/ListComment";

export default function TaskDetail(props) {
  const { show, handleClose } = props;
  const [formData, setFormData] = useState([]);

  // useEffect(() => {
  //   https
  //     .get("/api/Project/getTaskDetail")
  //     .then((res) => {
  //       setFormData(res.data.content);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.issue]: e.target.value });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      size="xl"
      centered
    >
      <Modal.Header>
        <Container>
          <Row>
            <Col xs={7}>
              <div className="task-title">
                <TaskType />
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <button className="p-2 mr-1 d-flex">
                  <BsFillSendPlusFill size={"20px"} />
                  <span className="ml-1">Give feedback</span>
                </button>
                <button className="p-2 mr-1 d-flex">
                  <BsLink45Deg size={"22px"} />

                  <span className="ml-1">Copy link</span>
                </button>
                <button className="p-2 ml-5">
                  <BsFillTrash3Fill size={"20px"} />
                </button>
                <button className="btn-close" data-dismiss="modal"></button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Row>
          <Col xs={7}>
            <div className="issue">
              <textarea
              onChange={handleOnChange}
                className="text-2xl font-medium"
                placeholder="Short summary"
                style={{ width: "100%", height: "78px" }}
              >

              </textarea>
            </div>
            <div className="description">
              <p className="p-2 text-sm font-medium">Description</p>
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
              <div className="btn d-flex">
                <Button
                  className="bg-blue-500 mr-3"
                  variant="primary"
                  size="sm"
                >
                  Save
                </Button>
                <Button className="bg-slate-500" variant="secondary" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
            <div className="comment pb-5 pt-3">
              <p className="p-2 pt-4 text-sm font-medium">Comments</p>
              <ListComment />
            </div>
          </Col>
          <Col>
            <div className="status">
              <p className="p-2 text-xs font-medium text-yellow-700">STATUS</p>
              <TaskStatus />
            </div>
            <div className="assignees pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                ASSIGNEES
              </p>
              <Assignees />
            </div>
            <div className="reporter pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                REPORTER
              </p>
             <Reporter />
            </div>
            <div className="priotity pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                PRIORITY
              </p>
              <Priority />
            </div>
            <div className="hours pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                ORIGINAL ESTIMATE (HOURS)
              </p>
              <Form.Control />
            </div>
            <div className="time pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                TIME TRACKING
              </p>
              <div className="d-flex ml-3">
                <BsAlarmFill />
                <div className="progress ml-2 w-full" style={{ height: 10 }}>
                  <div
                    className="progress-bar progress-bar-triped progress-bar-animated"
                    role="progressbar"
                    style={{ width: "50%" }}
                  ></div>
                </div>
              </div>
              <div className="d-flex ml-9">
                <span className="text-xs mr-60">No time logged</span>
                <span className="text-xs">1h estimated</span>
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
