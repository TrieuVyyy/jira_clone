import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import {
  message,
  Input,
  Space,
  Table,
  Avatar,
  Button,
  Drawer,
  Popover,
  Tag,
  Popconfirm,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryProject from "../CreateProject/CategoryProject";
import AddMember from "./AddMember";

export default function ListProject() {
  const [projectList, setProjectList] = useState([]);
  const [search, setSearch] = useState("");
  const [editedProject, setEditedProject] = useState([]);

  const fetchProjectList = () => {
    https
      .get("/api/Project/getAllProject")
      .then((res) => {
        setProjectList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  //tìm project theo tên
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") {
      fetchProjectList();
    } else {
      const filtered = projectList.filter((project) =>
        project.projectName.toLowerCase().includes(value.toLowerCase())
      );
      setProjectList(filtered);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record) => (
        <Link
          to={`/project-detail/${record.id}`}
          className="text-decoration-none"
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
        <Tag color="green" style={{ fontWeight: "600" }}>
          {creator.name.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (members, record) => (
        <div className="flex items-center">
          <Popover
            title="Members"
            key={record.id}
            content={
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "scroll",
                  overflowX: "hidden",
                }}
              >
                <Table
                  size="small"
                  pagination={false}
                  dataSource={members}
                  columns={[
                    {
                      title: "User ID",
                      dataIndex: "userId",
                      key: "userId",
                    },
                    {
                      title: "Avatar",
                      key: "avatar",
                      render: (_, member) => <Avatar src={member.avatar} />,
                    },
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "",
                      key: "action",
                      render: (member) => {
                        return (
                          <Popconfirm
                            title="Delete the member"
                            description="Are you sure to delete this member?"
                            onConfirm={() =>
                              handleRemoveMember(member.userId, record.id)
                            }
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger size="small" shape="circle">
                              X
                            </Button>
                          </Popconfirm>
                        );
                      },
                    },
                  ]}
                />
              </div>
            }
            trigger="hover"
          >
            <div className="flex ">
              <Avatar.Group
                maxCount={2}
                maxStyle={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                }}
              >
                {members.map((member, index) => (
                  <Avatar key={index} src={member.avatar} />
                ))}
              </Avatar.Group>
              <AddMember
                projectId={record.id}
                refreshProjectList={fetchProjectList}
              />
            </div>
          </Popover>
        </div>
      ),
    },

    {
      title: "Aciton",
      key: "action",
      width: 80,
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
            <Popconfirm
              title="Delete the project"
              description="Are you sure to delete this project?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <button>
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
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  //xóa member trong project
  const handleRemoveMember = (userId, projectId) => {
    const member = {
      userId,
      projectId,
    };
    https
      .post(`/api/Project/removeUserFromProject?project`, member)
      .then((res) => {
        message.success("Member removed successfully");
        fetchProjectList();
      })
      .catch((err) => {
        console.log(err);
        message.error("You are not the project creator");
      });
  };

  //mở Drawer Edit
  const [isEditing, setIsEditing] = useState(false);
  const showEditDrawer = (project) => {
    setEditedProject(project);
    setIsEditing(true);
  };
  const onClose = () => {
    setIsEditing(false);
  };

  const handleEdit = (e, record) => {
    if (record) {
      setEditedProject({
        id: record.id,
        projectName: record.projectName,
        creator: record.creator.id,
        description: record.description,
        categoryId: record.categoryId,
      });
      setIsEditing(true);
    }
  };

  const EditProject = ({ visible, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelect = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    //cập nhật project
    const handleUpdate = (id) => {
      const updatedProjectList = projectList.map((project) =>
        project.id === id ? editedProject : project
      );
      setProjectList(updatedProjectList);
      https
        .put(`/api/Project/updateProject?projectId=${formData.id}`, formData)
        .then((res) => {
          message.success("Update successful");
          setIsEditing(false);
          fetchProjectList();
        })
        .catch((err) => {
          message.error("You are not the project creator");
        });
    };

    return (
      <Drawer title="Edit Project" open={visible} onClose={onClose}>
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
            onChange={handleChange}
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
            name="categoryId"
            onSelect={handleSelect}
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

  //xóa project
  const handleDelete = (id) => {
    https
      .delete(`/api/Project/deleteProject?projectId=${id}`)
      .then((res) => {
        message.success("Delete successful");
        fetchProjectList();
      })
      .catch((err) => {
        message.error("You are not the project creator");
      });
  };

  return (
    <div>
      <h3 className=" text-gray-500">Project Managerment</h3>
      <div className="flex justify-between items-center">
        <Input
          className="my-4"
          prefix={<SearchOutlined />}
          style={{ width: "300px", height: "40px" }}
          placeholder="Search Project..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Link to="/createproject" className="btn btn-success my-2">
          + Add Project
        </Link>
      </div>

      <Table
        columns={columns}
        dataSource={projectList}
        scroll={{
          y: 400,
        }}
      />

      <EditProject visible={isEditing} initialValues={editedProject} />
    </div>
  );
}
