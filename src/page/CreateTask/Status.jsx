import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function Status() {
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
    <select name="priority" className="form-select">
      {status.map((item) => (
        <option value={item.statusId}>{item.statusName}</option>
      ))}
    </select>
  );
}
