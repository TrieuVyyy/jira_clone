import { Button, Select } from "antd";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function CreateProject() {
  return (
    <div className="container p-4">
      <h1 className="font-bold text-2xl ml-20">Create Project</h1>
      <form className="container">
        <div className="form-group p-2">
          <p className="p-2 text-sm font-light">Name</p>
          <input
            style={{ width: "100%" }}
            className="form-control"
            name="projectName"
          />
        </div>
        <div className="form-group p-2">
          <p className="p-2 text-sm font-light">Description</p>
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
            initialValue="Welcome to TinyMCE!"
          />
        </div>
        <div className="form-group p-2">
          <p className="p-2 text-sm font-light">Project Category</p>
          <Select
            name="projectName"
            showSearch
            style={{
              width: "100%",
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Software",
              },
              {
                value: "2",
                label: "Web",
              },
              {
                value: "3",
                label: "App",
              },
            ]}
          />
          <Button
            className="bg-green-700 mt-3"
            type="primary"
            htmlType="submit"
            style={{ color: "#fff" }}
          >
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
