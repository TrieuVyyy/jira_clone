import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function Status(props) {
  const { onSelect, defaultValue } = props;
  const [status, setStatus] = useState([]);
  
  useEffect(() => {
    https
      .get("/api/Status/getAll")
      .then((res) => {
        setStatus(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <select
      value={defaultValue}
      name="statusId"
      className="form-select"
      onChange={onSelect}
      style={{ width: "150px" }}
    >
      {status.map((item) => (
        <option key={item.statusId} value={item.statusId}>
          {item.statusName}
        </option>
      ))}
    </select>
  );
}
