import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { https } from "../../service/api";

export default function Assignees() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    https
      .get("/api/Users/getUser")
      .then((res) => {
        console.log(res.data);
        setUserList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const [value, setValue] = React.useState([]);
  const suffix = (
    <>
      <span>{value.length}</span>
      <DownOutlined />
    </>
  );

  const handleAssignUserTask = () => {
    https
      .post(`/api/Project/assignUserTask`)
      .then((res) => {
        // setUserList()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Select
      mode="multiple"
      value={value}
      style={{
        width: "100%",
      }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder="Please select user"
    >
      {userList.map((user) => (
        <Select.Option
          key={user.userId}
          value={user.userId}
          onClick={handleAssignUserTask}
        >
          {user.name}
        </Select.Option>
      ))}
    </Select>
  );
}
