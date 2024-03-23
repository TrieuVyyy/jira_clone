import React, { useEffect, useState } from "react";
import { Image, Button, Form, FloatingLabel } from "react-bootstrap";
import avt1 from "../../../assets/images/avt1.png";
import { https } from "../../../service/api";


export default function ListComment() {
  const [formData, setFormData] = useState([]);
  const [listComment, setListComment] = useState([]);

  useEffect(() => {
    https
      .get("/api/Comment/getAll")
      .then((res) => {
        setListComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnChange = (e) => {
    setListComment({ ...listComment, [e.target.comment]: e.target.value });
  };

  const handleAdd = () => {
    https
      .post("/api/Comment/insertComment", formData)
      .then((res) => {
        console.log(res.data.content);
        setFormData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="input-cmt p-2 d-flex">
        <Image src={avt1} style={{ width: "36px" }} roundedCircle />
        <FloatingLabel
          style={{ height: "36px", width: "100%" }}
          controlId="floatingTextarea"
          label="Add a comment...   "
          className="ml-3"
        >
          <Form.Control
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, comment: data });
            }}
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
      <div className="ml-14">
        <Button
          onClick={handleAdd}
          className="bg-blue-500 mr-3"
          variant="primary"
          size="sm"
        >
          Add
        </Button>
      </div>

      <div className="p-2 d-flex">
        <Image src={avt1} style={{ width: "36px" }} roundedCircle />
        <div className="d-flex ml-4">
          <span className="mr-2">Lord Gaben</span>
          {listComment.map((item) => (
            <p className="text-xs font-thin p-1">{item.dateTime}</p>
          ))}
        </div>
      </div>
      <div className="ml-14">
        {listComment.map((item) => (
          <input style={{ width: "100%" }} type="text">
            {item.content}
          </input>
        ))}
      </div>
      <div className="d-flex ml-14">
        <Button variant="outline-secondary" size="sm" className="mr-3">
          Edit
        </Button>
        <Button variant="outline-secondary" size="sm">
          Delete
        </Button>
      </div>
    </div>
  );
}
