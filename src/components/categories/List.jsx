import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Preview from "./Preview";

function List() {
  const { data } = useFetch(`${process.env.REACT_APP_API_URL}/categories`);

  return (
    <ul>
      {data &&
        data.map((category) => (
          <li key={category._id}>
            <Link to={`/categories/${category.name}`}>{category.name}</Link>
            <Preview category={category} />
          </li>
        ))}
    </ul>
  );
}

export default List;
