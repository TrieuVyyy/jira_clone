import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function Priority(props) {
  const { onSelect, defaultValue } = props;
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    https
      .get("/api/Priority/getAll")
      .then((res) => {
        setPriority(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select
      value={defaultValue}
      name="priorityId"
      className="form-select"
      onChange={onSelect}
    >
      {priority.map((item) => (
        <option key={item.priorityId} value={parseInt(item.priorityId)}>
          {item.priority}
        </option>
      ))}
    </select>
  );
}
