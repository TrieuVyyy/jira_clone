import React, { useEffect, useState } from "react";
import { Avatar, Button, message, Popconfirm } from "antd";
import { https } from "../../../service/api";

export default function ListComment({ taskId }) {
  const [formData, setFormData] = useState([]);
  const [listComment, setListComment] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);

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
    setFormData({ contentComment: "" });
    setShowButtons(false);
    setEditingCommentId(null);
  };

  //tạo cmt
  const handleInsert = (e) => {
    e.preventDefault();
    https
      .post("/api/Comment/insertComment", {
        taskId,
        ...formData,
      })
      .then((res) => {
        setListComment([res.data.content, ...listComment]);
        setFormData({ contentComment: "" });
        setShowButtons(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditClick = (comment) => {
    setFormData({ contentComment: comment.contentComment });
    setEditingCommentId(comment.id);
  };

  //sửa cmt
  const handleUpdate = () => {
    https
      .put(`/api/Comment/updateComment?id=${editingCommentId}`, {
        taskId,
        ...formData,
      })
      .then((res) => {
        const updatedComments = listComment.map((comment) =>
          comment.id === editingCommentId ? res.data.content : comment
        );
        setListComment(updatedComments);
        message.success("Update successful");
        setEditingCommentId(null);
        setFormData({ contentComment: "" });
        setShowButtons(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed");
      });
  };

  //xóa cmt
  const handleDelete = (id) => {
    https
      .delete(`/api/Comment/deleteComment?idComment=${id}`)
      .then((res) => {
        message.success("Delete successful");
        setListComment(listComment.filter((comment) => comment.id !== id));
      })
      .catch((err) => {
        message.error("Delete failed");
      });
  };

  return (
    <div className="comment-section space-y-3">
      <div className="input-cmt flex items-center space-x-3">
        <Avatar />
        <input
          type="text"
          style={{ width: "100%" }}
          className="form-control"
          name="contentComment"
          onChange={handleOnChange}
          placeholder="Add a comment..."
          onFocus={() => setShowButtons(true)}
        />
      </div>
      {showButtons && (
        <div className="ml-10 flex items-center space-x-3">
          <Button
            type="primary"
            className="bg-blue-600"
            size="small"
            onClick={handleInsert}
          >
            Save
          </Button>
          <Button size="small" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}

      {listComment.length > 0 && (
        <div className="comments-list space-y-3">
          {listComment.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-userName space-x-2">
                <Avatar src={comment.user?.avatar} />
                <span className="font-medium">{comment.user?.name}</span>
              </div>
              <div className="comment-content ml-10 space-y-2">
                {editingCommentId === comment.id ? (
                  <>
                    <input
                      type="text"
                      name="contentComment"
                      value={formData.contentComment}
                      onChange={handleOnChange}
                    />
                    <div className="flex items-center space-x-3">
                      <Button
                        type="primary"
                        className="bg-blue-600"
                        size="small"
                        onClick={handleUpdate}
                      >
                        Save
                      </Button>
                      <Button size="small" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{comment.contentComment}</span>
                    <div className="flex items-center space-x-3">
                      <button onClick={() => handleEditClick(comment)}>
                        Edit
                      </button>
                      <Popconfirm
                        title="Delete the comment"
                        description="Are you sure to delete this comment?"
                        onConfirm={() => handleDelete(comment.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <button>Delete</button>
                      </Popconfirm>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
