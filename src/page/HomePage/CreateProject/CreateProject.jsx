import { Button, message } from "antd";
import { Form } from "react-bootstrap";
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from "react-router-dom";
import { https } from "../../../service/api";

export default function CreateProject() {
  const navigate= useNavigate()
  const [product, setProduct] = useState([]);

  const handleCrate =() => {
    https
    .post('/api/Project/createProject')
    .then((res) => {
      navigate('/project')
      console.log(res)
      setProduct(res.data.content)
      message.success('Create new projects successfully')
    })
    .catch((err) => {
      message.error("Failed to create project");
      console.log(err)
    }) 
  }

  return (
    <div className="container pt-10">
      <h1 className="font-bold text-2xl ml-5 text-gray-500">Create Project</h1>
      <form className="container">
        <div className="form-group p-2">
          <p className="text-sm font-light">Name</p>
          <input
            style={{ width: "100%" }}
            className="form-control"
            name="projectName"
            onChange={(e) => setProduct({ ...product, productName: e })}
          />
        </div>
        <div className="form-group p-2">
          <p className="text-sm font-light">Description</p>
          <Editor
            apiKey="owrcj1vln2r9ggx5ffkbukeiylmcfdo8dtt6pyfop37lamyj"
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
            onChange={(e) => setProduct({ ...product, desciption: e })}
          />
        </div>
        <div className="form-group p-2">
          <p className="text-sm font-light">Project Category</p>
          
          <Form.Select aria-label="Default select example" style={{width: '40%'}}>
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Button
            className="bg-green-700 mt-3"
            type="primary"
            // htmlType="submit"
            style={{ color: "#fff" }}
            onClick={handleCrate}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
