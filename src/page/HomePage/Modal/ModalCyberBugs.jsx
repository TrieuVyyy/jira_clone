import React from "react";
import {
  Button,
  Col,
  Modal,
  Row,
  Form,
  Container,
  Image,
  FloatingLabel,
} from "react-bootstrap";
import {
  BsFillSendPlusFill,
  BsLink45Deg,
  BsFillTrash3Fill,
  BsAlarmFill,
} from "react-icons/bs";
import { Editor } from "@tinymce/tinymce-react";
import avt1 from "../../../assets/images/avt1.png";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function ModalCyberBugs(props) {
  const { show, handleClose } = props;
  const handleEditorChange = (content, editor) => {
    console.log("Content was update:", content);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      size="xl"
      centered
    >
      <Modal.Header closeButton>
        <Container>
          <Row>
            <Col xs={7}>
              <div className="task-title">
                <Form.Select
                  size="sm"
                  aria-label="Default select example"
                  style={{ width: "23%" }}
                >
                  <option value="1">TASK-12243</option>
                  <option value="2">Bug</option>
                  <option value="3">Story</option>
                </Form.Select>
              </div>
            </Col>
            <Col>
              <div className="d-flex">
                <div className="p-2 mr-1 d-flex">
                  <BsFillSendPlusFill size={"20px"} />
                  <span className="ml-1">Give feedback</span>
                </div>
                <div className="p-2 mr-1 d-flex">
                  <BsLink45Deg size={"22px"} />

                  <span className="ml-1">Copy link</span>
                </div>
                <div className="p-2 ml-5">
                  <BsFillTrash3Fill size={"20px"} />
                </div>
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
                className="text-2xl font-medium"
                placeholder="Short summary"
                style={{ width: "100%", height: "78px" }}
              >
                You can track how mawny hours were spent working on an issue,
                and how many hours remain.
              </textarea>
            </div>
            <div className="description">
              <p className="p-2 text-sm font-medium">Description</p>
              <Editor
                init={{
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                initialValue=""
                onEditorChange={handleEditorChange}
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
              <div className="input-cmt p-2 d-flex">
                <Image src={avt1} style={{ width: "36px" }} roundedCircle />
                <FloatingLabel
                  style={{ height: "36px", width: "100%" }}
                  controlId="floatingTextarea"
                  label="Add a comment...   "
                  className="ml-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                  />
                </FloatingLabel>
              </div>
              <div className="protip d-flex pt-4 ml-14">
                <strong className="text-xs ml-1">Pro tip:</strong>
                <p className="text-xs ml-1">press</p>
                <span className="text-xs font-extrabold ml-1">M</span>
                <p className="text-xs ml-1">to comment</p>
              </div>

              <div className="issue-cmt ">
                <div className="p-2 d-flex">
                  <Image src={avt1} style={{ width: "36px" }} roundedCircle />
                  <div className="d-flex ml-4">
                    <span className="mr-2">Lord Gaben</span>
                    <p className="text-xs font-thin p-1">a month ago</p>
                  </div>
                </div>
                <p className="ml-16">
                  Autumn moonlight- a worm digs silently into the chestnut.
                </p>
                <div className="btn d-flex ml-12">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mr-3"
                  >
                    Edit
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="status">
              <p className="p-2 text-xs font-medium text-yellow-700">STATUS</p>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                style={{ width: "25%" }}
              >
                <option value="1">BACKLOG</option>
                <option value="2">SELECTED FOR DEVELOPMENT</option>
                <option value="3">IN PROGRESS</option>
                <option value="4">DONE</option>
              </Form.Select>
            </div>
            <div className="assignees pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                ASSIGNEES
              </p>
              <div className="form-group d-flex">
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  style={{ width: "25%" }}
                >
                  <option value="1">Rick</option>
                  <option value="2">Yoda</option>
                  <option value="3">Gaben</option>
                </Form.Select>
                <Button size="sm" variant="link">
                  + Add more
                </Button>
              </div>
            </div>
            <div className="reporter pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                REPORTER
              </p>
              <div className="form-group d-flex">
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  style={{ width: "25%" }}
                >
                  <option value="1">Rick</option>
                  <option value="2">Yoda</option>
                  <option value="3">Gaben</option>
                </Form.Select>
              </div>
            </div>
            <div className="priotity pt-3">
              <p className="p-2 text-xs font-medium text-yellow-700">
                PRIORITY
              </p>
              <div className="form-group d-flex">
                <Form.Select
                  aria-label="Default select example"
                  size="sm"
                  style={{ width: "25%" }}
                >
                  <option value="1">Low</option>
                  <option value="2">High</option>
                  <option value="3">Medium</option>
                  <option value="3">Lowest</option>
                  <option value="3">Hightest</option>
                </Form.Select>
              </div>
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
