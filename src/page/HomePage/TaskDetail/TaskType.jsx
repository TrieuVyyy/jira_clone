import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";

export default function TaskType() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    https
      .get("/api/TaskType/getAll")
      .then((res) => {
        setTaskList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select name="tasktype" className="form-select">
      {taskList.map((task) => (
        <option value="">{task.taskType}</option>
      ))}
    </select>
  );
}
