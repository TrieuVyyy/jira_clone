import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { useParams } from "react-router-dom";
import { Popover, Table, Button, Avatar, Popconfirm, Tooltip } from "antd";
import AddMember from "./AddMember";

export default function UserByProjectId() {
  const [userByProjecId, setUserByProjectId] = useState([]);
  let { id } = useParams;

  useEffect(() => {
    if(id){

        https
          .get(`/api/Users/getUserByProjectId?idProject=${id}`)
          .then((res) => {
            setUserByProjectId(res.data.content);
            console.log(res.data)
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }, []);

  const columns = [
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
  ];
  return (
    <div>
      {/* {userByProjecId.slice(0, 2).map((member) => (
        <Popover
          key={member.userId}
          content={<Table columns={columns} dataSource={userByProjecId} />}
        ></Popover>
      ))}
      {userByProjecId.length > 2 && (
        <Tooltip title="More members">
          <Avatar className="bg-gray-200 text-gray-600">
            +{userByProjecId.length - 2}
          </Avatar>
        </Tooltip>
      )} */}
    </div>
  );
}
