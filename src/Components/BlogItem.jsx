import { Skeleton } from "antd";
import { getDetailByTokenId, getTokenUri } from "../service/web3BlogService";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function BlogItem() {
  const location = useLocation();
  const tokenId = Number(location.pathname.split("/")[1]);

  const [title, setTitle] = useState("");
  const [updateTimestamp, setUpdateTimestamp] = useState("");
  const [content, setContent] = useState("");

  const getBlogTitle = async () => {
    const { success, title, lastUpdateTimestamp } = await getDetailByTokenId(
      tokenId
    );
    if (!success) {
      alert("Get token title failed!");
      return;
    }

    setTitle(title);
    setUpdateTimestamp(lastUpdateTimestamp);
  };

  const getBlogContent = async () => {
    const { success, data } = await getTokenUri(tokenId);
    if (!success) {
      alert("Get tokenUri failed!");
      return;
    }

    const url = "http://127.0.0.1:1984/" + data;
    axios
      .get(url)
      .then((data) => {
        setContent(data.data);
      })
      .catch((err) => {
        alert("Fetch blog content failed!");
      });
  };

  useEffect(() => {
    getBlogTitle();
    getBlogContent();
  // eslint-disable-next-line
  }, []);

  return (
    <div>
      {title && content ? (
        <div>
          <h1>{title}</h1>
          <h2>
            {"lastUpdateTime: " +
              new Date(Number(updateTimestamp)).toLocaleString()}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
