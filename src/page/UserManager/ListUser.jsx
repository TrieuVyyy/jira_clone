import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { message, Space, Input, Table, Popconfirm, Drawer, Button } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

export default function ListUser() {
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [editedUser, setEditedUser] = useState([]);

  const fetchUserList = () => {
    https
      .get("/api/Users/getUser")
      .then((res) => {
        setUserList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
            <Popconfirm
              title="Delete the user"
              description="Are you sure to delete this user?"
              onConfirm={() => handleDeleteUser(record.userId)}
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

  //tìm user theo têm
  const handleSearch = (value) => {
    setSearch(value);
    if (value === "") {
      fetchUserList();
    } else {
      const filteredUsers = userList.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setUserList(filteredUsers);
    }
  };

  //mở Drawer Edit
  const [isEditing, setIsEditing] = useState(false);
  const showEditDrawer = (user) => {
    setEditedUser(user);
    setIsEditing(true);
  };
  const onClose = () => {
    setIsEditing(false);
  };

  const handleEdit = (e, record) => {
    if (record) {
      setEditedUser({
        userId: record.userId,
        passWord: record.passWord,
        email: record.email,
        name: record.name,
        phoneNumber: record.phoneNumber,
      });
      setIsEditing(true);
    }
  };

  const EditUser = ({ visible, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //cập nhật project
    const handleUpdate = () => {
      //lấy tất cả các field trong formData trừ userId
      const { userId, ...rest } = formData;
      const user = {
        id: `${formData.userId}`,
        ...rest,
      };

      https
        .put(`/api/Users/editUser`, user)
        .then((res) => {
          message.success("Update successful");
          setIsEditing(false);
          fetchUserList();
        })
        .catch((err) => {
          console.log(err);
          message.error("Update failed");
        });
    };

    return (
      <Drawer title="Edit User" open={visible} onClose={onClose}>
        <form className="space-y-3">
          <label className=" text-gray-700 text-sm font-bold">ID:</label>
          <input
            disabled
            className="shadow border rounded w-full py-1 px-2 text-red-500"
            type="text"
            name="userId"
            value={formData?.userId}
          />
          <label className=" text-gray-700 text-sm font-bold">Email:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <label className=" text-gray-700 text-sm font-bold">Name:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />

          <label className=" text-gray-700 text-sm font-bold">
            Phone Number:
          </label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="number"
            name="phoneNumber"
            value={formData?.phoneNumber}
            onChange={handleChange}
          />
          <label className=" text-gray-700 text-sm font-bold">Password:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="passWord"
            value={formData?.passWord}
            onChange={handleChange}
          />

          <Button className="bg-blue-700" type="primary" onClick={handleUpdate}>
            Save
          </Button>
        </form>
      </Drawer>
    );
  };

  //xóa user
  const handleDeleteUser = (userId) => {
    https
      .delete(`/api/Users/deleteUser?id=${userId}`)
      .then((res) => {
        console.log(res.data);
        message.success("Delete successful");
        fetchUserList();
      })
      .catch((err) => {
        message.error("Delete failed");
      });
  };
  return (
    <div>
      <h3 className=" text-gray-500">User Managerment</h3>
      <div className="flex justify-between">
        <Input
          className="my-4"
          prefix={<SearchOutlined />}
          style={{ width: "300px", height: "40px" }}
          placeholder="Search Member..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <Table
        columns={columns}
        dataSource={userList}
        scroll={{
          y: 400,
        }}
      />

      <EditUser visible={isEditing} initialValues={editedUser} />
    </div>
  );
}
