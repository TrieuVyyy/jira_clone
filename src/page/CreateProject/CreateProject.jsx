import { Button, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryProject from "./CategoryProject";

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    https
      .post("/api/Project/createProjectAuthorize", formData)
      .then((res) => {
        navigate("/project");
        message.success("Create new project successfully");
      })
      .catch((err) => {
        message.error("Failed to create project");
      });
  };

  return (
    <div className="container">
      <h1 className="font-bold text-2xl text-gray-500">Create Project</h1>
      <form className="space-y-2">
        <label className="text-sm font-medium pt-6">Name</label>
        <input
          style={{ width: "100%" }}
          className="form-control"
          name="projectName"
          onChange={handleOnChange}
        />

        <label className="text-sm font-medium pt-6">Description</label>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onChange={(e, editor) => {
            const data = editor.getData();
            setFormData({ ...formData, description: data });
          }}
        />

        <label className="text-sm font-medium pt-6">Project Category</label>
        <CategoryProject onSelect={handleSelect} name="categoryId" />

        <Button
          className="bg-green-700 mt-3"
          type="primary"
          htmlType="submit"
          style={{ color: "#fff" }}
          onClick={handleCreate}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
