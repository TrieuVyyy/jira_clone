import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function TaskType(props) {
  const { onSelect , defaultValue} = props;
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
    <select name="typeId" className="form-select" onChange={onSelect} style={{ width: "150px" }}>
      {taskList.map((task) => (
        <option
          value={task.id}
          key={task.id}
          selected={task.id === defaultValue}
        >
          {task.taskType}
        </option>
      ))}
    </select>
  );
}
