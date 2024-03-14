import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";

export default function Priority() {
  const [priority, setPriority] = useState([]);

  useEffect(() => {
    https
      .get("/api/Priority/getAll")
      .then((res) => {
        setPriority(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select name="priority" className="form-select">
      {priority.map((item) => (
        <option value="">{item.priority}</option>
      ))}
    </select>
  );
}
