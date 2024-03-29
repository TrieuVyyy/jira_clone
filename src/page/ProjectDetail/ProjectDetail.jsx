import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import HeaderMain from "./HeaderMain";
import InfoMain from "./InfoMain";
import ContentMain from "./ContentMain";

export default function ProjectDetail() {
  const [detail, setDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    https
      .get(`/api/Project/getProjectDetail?id=${id}`)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        setDetail(res.data.content);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  return <div className="container p-3">
    <h1 className="text-2xl font-bold">Cyber Board</h1>
    <HeaderMain />
    <InfoMain />
    <ContentMain />
  </div>;
}
