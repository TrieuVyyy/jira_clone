import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { https } from "../../../service/api";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateProject() {
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    https
      .get("/api/ProjectCategory")
      .then((res) => {
        setCategoryList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (e) => {
    setFormData({ ...formData, [e.target.category]: e.target.value });
  };

  const handleCreate = () => {
    https
      .post("/api/Project/createProjectAuthorize", formData)
      .then((res) => {
        navigate("/project");
        console.log(res.data.content);
        setFormData(res.data.content);
        message.success("Create new project successfully");
      })
      .catch((err) => {
        message.error("Failed to create project");
      });
  };

  return (
    <div className="container pt-10">
      <h1 className="font-bold text-2xl ml-5 text-gray-500">Create Project</h1>
      <form className="container">
        <div className="form-group p-2">
          <label className="text-sm font-light">Name</label>
          <input
            style={{ width: "100%" }}
            className="form-control"
            name="projectName"
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light">Description</label>
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
        </div>
        <div className="form-group p-2">
          <label className="text-sm font-light">Project Category</label>

          <select
            className="form-select"
            name="categoryId"
            onChange={handleSelect}
          >
            <option selected value="">
              Choose Category Name
            </option>
            {categoryList.map((category) => (
              <option value={category.id} key={category.id}>
                {category.projectCategoryName}
              </option>
            ))}
          </select>

          <Button
            className="bg-green-700 mt-3"
            type="primary"
            htmlType="submit"
            style={{ color: "#fff" }}
            onClick={handleCreate}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
