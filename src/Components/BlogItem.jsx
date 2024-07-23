import { Skeleton } from "antd";
import { getDetailByTokenId, getTokenUri } from "../service/web3BlogService";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { arweaveGateway } from "../config";

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

    const url = arweaveGateway + data;
    console.log(url);
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
          <h1 className="blog-title">{title}</h1>
          <h3 className="blog-time">
            {"lastUpdateTime: " +
              new Date(Number(updateTimestamp)).toLocaleString()}
          </h3>
          <div className="blog-item">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
