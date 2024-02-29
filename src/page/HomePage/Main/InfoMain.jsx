import React, { useState } from "react";
import { Avatar, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import avt1 from '../../../assets/images/avt1.png'
import avt2 from '../../../assets/images/avt2.png'
import avt3 from '../../../assets/images/avt3.png'

const InfoMain = () => {
  return (
    <div className="flex pb-5">
      <Input prefix={<SearchOutlined />} style={{ width: "20%" }} className="mr-5" />
      <Avatar>
        <img src={avt1} alt="" />
      </Avatar>
      <Avatar>
        <img src={avt2} alt="" />
      </Avatar>
      <Avatar>
        <img src={avt3} alt="" />
      </Avatar>

      <Button
        style={{
          margin: "0 16px",
          verticalAlign: "middle",
        }}
      
      >
        Only My Issues
      </Button>
      <Button
        style={{
          verticalAlign: "middle",
        }}
  
      >
        Recently Updated
      </Button>
    </div>
  );
};
export default InfoMain;
