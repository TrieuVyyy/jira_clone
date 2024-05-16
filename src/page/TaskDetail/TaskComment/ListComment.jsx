import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { https } from "../../../service/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function ListComment({ taskId }) {
  const [formData, setFormData] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    https
      .get(`/api/Comment/getAll?taskId=${taskId}`)
      .then((res) => {
        console.log(res.data);
        setListComment(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [taskId]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setShowButtons(true);
  };

  const handleCancel = () => {
    setFormData({ comment: "" });
    setShowButtons(false);
  };

  const handleAdd = () => {
    https
      .post("/api/Comment/insertComment", formData)
      .then((res) => {
        console.log(res.data.content);
        // setFormData(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="input-cmt flex space-x-3">
        <Avatar />
        <input
          type="text"
          style={{ width: "100%" }}
          className="form-control"
          name="comment"
          value={formData.comment}
          onChange={handleOnChange}
          placeholder="Add a comment..."
          onFocus={() => setShowButtons(true)}
          onBlur={() => setShowButtons(false)}
        />
      </div>
      {showButtons && (
        <div className="flex ml-10 pt-2 space-x-5">
          <Button type="primary" className="bg-blue-600" size="small" onClick={handleAdd}>
            Save
          </Button>
          <Button size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
      {showButtons ? null : (
        <div className="protip flex ml-10">
          <strong className="text-xs ml-1">Pro tip:</strong>
          <p className="text-xs ml-1">press</p>
          <span className="text-xs font-extrabold ml-1">M</span>
          <p className="text-xs ml-1">to comment</p>
        </div>
      )}

      
    </>
  );
}
