import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function CategoryProject(props) {

  const {onSelect, name, defaultValue} = props;
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    https
      .get("/api/ProjectCategory")
      .then((res) => {
        setCategoryList(res.data.content);
      })
      .catch((err) => {});
  }, []);

  return (
    <div>
      <select className="form-select" onChange={(e) => onSelect(e.target.name, e.target.value)} name={name}>
        <option value="">
          Choose Category Name
        </option>
        {categoryList.map((category) => (
          <option value={category.id} key={category.id} selected={category.id === defaultValue}>
            {category.projectCategoryName}
          </option>
        ))}
      </select>
    </div>
  );
}
