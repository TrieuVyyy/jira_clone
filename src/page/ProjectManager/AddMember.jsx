import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { Popover, Input, Button, List, Avatar, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function AddMember({ accessToken }) {
  const [listUser, setListUser] = useState([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const fectchUserList = () => {
    if (showList) {
      setLoading(true);
      https
        .get("/api/Users/getUser")
        .then((res) => {
          const filteredUsers = res.data.content.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          );
          setListUser(filteredUsers);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setLoading(true);
    fectchUserList();
  }, [showList, search]);

  const toggleList = () => {
    setShowList(!showList);
  };

  const handleChange = (selectedUsers) => {
    console.log("handleChange", selectedUsers);
  };

  //add member
  const handleAdd = (user) => {
    const updatedUsers = [...selectedUsers, user];
    setSelectedUsers(updatedUsers);
    setShowList(false);
  };

  const handleAddMember = (projectId) => {
    if (selectedUsers.length === 0) {
      message.error("Select at least one user to add as a member.");
      return;
    }
    const userIds = selectedUsers.map((user) => user.id);
    https
      .post(`/api/Project/assignUserProject?project=${projectId}`, userIds)
      .then((res) => {
        message.success("Add member successful");
        setSelectedUsers([]);
        fectchUserList(selectedUsers);
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Add member faild");
      });
  };

  const content = (
    <div>
      <Input
        prefix={<SearchOutlined />}
        style={{ width: "100%" }}
        placeholder="Search Member"
        value={search}
        onClick={toggleList}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div
        style={{ maxHeight: "200px", overflowY: "scroll", overflowX: "hidden" }}
      >
        <List
          dataSource={listUser}
          renderItem={(user) => (
            <List.Item
              key={user.id}
              onClick={() => handleAdd(user)}
              style={{ cursor: "pointer" }}
              onChange={handleChange}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={user.name}
              />
            </List.Item>
          )}
        />
      </div>
      {selectedUsers.length > 0 && (
        <button className="btn btn-primary btn-sm" onClick={handleAddMember}>
          Add
        </button>
      )}
    </div>
  );
  return (
    <Popover content={content} title="Add Member" trigger="click">
      <Button className="bg-gray-200 text-gray-600 text-center" shape="circle">
        +
      </Button>
      {selectedUsers.map((user) => (
        <Avatar key={user.id} src={user.avatar} />
      ))}
    </Popover>
  );
}
