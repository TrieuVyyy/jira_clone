import React, { useEffect, useState } from "react";
import ListComment from "./ListComment";
import { Image, FloatingLabel, Form, Button } from "react-bootstrap";
import avt1 from "../../../assets/images/avt1.png";

export default function Comment() {
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
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
      </div>
      <div className="protip d-flex pt-4 ml-14">
        <strong className="text-xs ml-1">Pro tip:</strong>
        <p className="text-xs ml-1">press</p>
        <span className="text-xs font-extrabold ml-1">M</span>
        <p className="text-xs ml-1">to comment</p>
      </div>
      <div className="ml-14">
        <Button className="bg-blue-500 mr-3" variant="primary" size="sm">
          Add
        </Button>
      </div>

      <div className="issue-cmt pt-2">
        <ListComment />
      </div>
    </div>
  );
}
