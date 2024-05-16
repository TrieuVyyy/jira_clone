import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { https } from "../../service/api";

export default function Assignees(props) {
  const {projectId, name, onSelect} = props;
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (projectId) {
    https
      .get(`/api/Users/getUserByProjectId?idProject=${projectId}`)
      .then((res) => {
        console.log(res.data);
        setUserList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [projectId]);
  const [value, setValue] = React.useState([]);
  const suffix = (
    <>
      <span>{value.length}</span>
      <DownOutlined />
    </>
  );
  
  useEffect(() => {
    onSelect(value)
  }, [value])

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
      name={name}
    >
      {userList.map((user) => (
        <Select.Option
          key={user.userId}
          value={user.userId}
        >
          {user.name}
        </Select.Option>
      ))}
    </Select>
  );
}
