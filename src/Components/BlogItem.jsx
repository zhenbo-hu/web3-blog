import { message, Skeleton } from "antd";
import { getDetailByTokenId, getTokenUri } from "../service/web3BlogService";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { arweaveGateway } from "../config";

export default function BlogItem() {
  const [messageApi, contextHolder] = message.useMessage();

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
      messageApi.error("无法获取到Blog标题!");
      return;
    }

    setTitle(title);
    setUpdateTimestamp(lastUpdateTimestamp);
  };

  const getBlogContent = async () => {
    const { success, data } = await getTokenUri(tokenId);
    if (!success) {
      messageApi.error("无法获取Blog内容Id!");
      return;
    }

    const url = arweaveGateway + data;
    axios
      .get(url)
      .then((data) => {
        setContent(data.data);
      })
      .catch((err) => {
        messageApi.error("无法获取Blog内容!");
      });
  };

  useEffect(() => {
    getBlogTitle();
    getBlogContent();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {contextHolder}
      {title && content ? (
        <div>
          <h1 className="blog-title">{title}</h1>
          <h3 className="blog-time">
            {"最近更新时间: " +
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
