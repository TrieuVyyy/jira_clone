import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { message, Space, Table, Avatar, Tooltip, Button, Drawer } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryProject from "../CreateProject/CategoryProject";

export default function ListProject() {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editedProject, setEditedProject] = useState([]);

  const fetchProjectList = () => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        setProjectList(res.data.content);
        message.success("Get data successfully");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProjectList();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record) => (
        <Link
          to={`/detail/${record.id}`}
          className="text-decoration-none font-semibold"
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Project Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      render: (creator) => (
        <span className="uppercase bg-emerald-400 text-green-800 font-semibold  px-1 py-1 rounded-sm">
          {creator.name}
        </span>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members) => (
        <div className="flex items-center">
          {members.slice(0, 2).map((member) => (
            <Avatar.Group key={member.userId}>
              <Avatar src={member.avatar} />
            </Avatar.Group>
          ))}
          {members.length > 2 && (
            <Tooltip title="More members">
              <Avatar className="bg-gray-200 text-gray-600">
                +{members.length - 2}
              </Avatar>
            </Tooltip>
          )}
          <Button
            className="bg-blue-400 text-center"
            type="primary"
            shape="circle"
          >
            +
          </Button>
        </div>
      ),
    },

    {
      title: "Aciton",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="small">
            <button onClick={(e) => handleEdit(e, record)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-400"
              >
                <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                handleDelete(record.id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
          </Space>
        );
      },
    },
  ];

  //mở Drawer Edit
  const [isEditing, setIsEditing] = useState(false);
  const showEditDrawer = (project) => {
    setEditedProject(project);
    setIsEditing(true);
  };
  const onClose = () => {
    setIsEditing(false);
  };

  const EditProject = ({ visible, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };

    return (
      <Drawer title="Edit Project" visible={visible} onClose={onClose}>
        <form className="space-y-3">
          <label className=" text-gray-700 text-sm font-bold">ID:</label>
          <input
            disabled
            className="shadow border rounded w-full py-1 px-2 text-red-500"
            type="text"
            name="id"
            value={formData?.id}
          />
          <label className=" text-gray-700 text-sm font-bold">
            Project Name:
          </label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="projectName"
            value={formData?.projectName}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <label className=" text-gray-700 text-sm font-bold">
            Description:
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={formData?.description}
            onChange={(e, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, description: data });
            }}
          />

          <label className=" text-gray-700 text-sm font-bold">
            Project Category:
          </label>
          <CategoryProject
            value={formData?.categoryName}
            name="categoryName"
            onSelect={handleChange}
            defaultValue={formData?.categoryId}
          />

          <Button
            className="bg-blue-700"
            type="primary"
            htmlType="submit"
            onClick={handleUpdate}
          >
            Save
          </Button>
        </form>
      </Drawer>
    );
  };

  const handleEdit = (e, record) => {
    const projectId = record.id;
    if (record) {
      setEditedProject({
        id: projectId,
        projectName: record.projectName,
        creator: record.creator.id,
        description: record.description,
        categoryId: record.categoryId,
      });
      setIsEditing(true);
    }
  };

  const handleUpdate = (id) => {
    if (!editedProject.id) {
      console.error("Missing project ID for update");
      return;
    }
    const updatedProjectList = projectList.map((project) =>
      project.id === id ? editedProject : project
    );
    setProjectList(updatedProjectList);
    https
      .put(
        `/api/Project/updateProject?projectId=${editedProject.id}`,
        editedProject
      )
      .then((res) => {
        message.success("Update successful");
        setIsEditing(false); // Close edit mode
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Update failed");
      });
  };

  //xóa project
  const handleDelete = (id) => {
    https
      .delete(`/api/Project/deleteProject?projectId=${id}`)
      .then((res) => {
        message.success("Deleted successful");
        fetchProjectList();
      })
      .catch((err) => {
        message.error("Deletion failed");
      });
  };

  return (
    <div>
      <h3 className=" text-gray-500">Projects List</h3>
      <div className="flex justify-content-end">
        <Link to="/create" className="btn btn-success my-4">
          + Add Project
        </Link>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} dataSource={projectList} />
      )}
      <EditProject visible={isEditing} initialValues={editedProject} />
    </div>
  );
}
