import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { Popover, Input, Button, List, Avatar, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function AddMember() {
  const [listUser, setListUser] = useState([]);
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);
  const [loading, setLoading] = useState(false);

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

  //add member
  const handleAddMember = (id) => {
    https
      .post(`/api/Project/assignUserProject?project=${id}`)
      .then((res) => {
        console.log(res.data);
        message.success("Add member successful");
        setShowList(false);
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
              onClick={() => handleAddMember(user)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={user.name}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
  return (
    <Popover content={content} title="Add Member" trigger="click">
      <Button className="bg-gray-200 text-gray-600 text-center" shape="circle">
        +
      </Button>
      
    </Popover>
  );
}
