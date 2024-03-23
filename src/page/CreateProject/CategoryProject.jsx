import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function CategoryProject() {
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
      <select className="form-select" name="categoryId">
        <option value="">
          Choose Category Name
        </option>
        {categoryList.map((category) => (
          <option value={category.id} key={category.id}>
            {category.projectCategoryName}
          </option>
        ))}
      </select>
    </div>
  );
}
