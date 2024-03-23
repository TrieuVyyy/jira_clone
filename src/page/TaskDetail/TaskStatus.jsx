import React, { useEffect, useState } from "react";
import { https } from "../../service/api";


export default function TaskStatus() {
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
    <select name="status" className="form-select">
      {status.map((item) => (
        <option value="">{item.statusName}</option>
      ))}
    </select>
  );
}
