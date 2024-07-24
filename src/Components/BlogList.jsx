import { Card, message, Pagination } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  getDetailByTokenId,
  getWeb3BlogTokenId,
} from "../service/web3BlogService";
import { PAGE_SIZE } from "../config";

export default function BlogList() {
  const baseUrl = window.location.search.split("=")[0] + "=";
  const currentPage = 1 || Number(window.location.search.split("=")[1]);
  const [messageApi, contextHolder] = message.useMessage();

  const homepageUrl = useRef("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState(0);

  const handlePageChange = (page) => {
    window.location.href = baseUrl + page;
  };

  const fetchBlogs = async () => {
    setLoading(true);
    const { success, data } = await getWeb3BlogTokenId();
    if (success) {
      setTokenId(data);
    } else {
      messageApi.error("无法获取Blog信息!");
      setLoading(false);
      return;
    }

    const endIdx = data - (currentPage - 1) * PAGE_SIZE;
    const startIdx = Math.max(endIdx - PAGE_SIZE + 1, 1);

    if (startIdx > endIdx || startIdx > data || endIdx <= 0) {
      messageApi.error("页面不存在!");
      return;
    }

    let blogs = new Array(endIdx - startIdx + 1);
    for (let i = endIdx; i >= startIdx; i--) {
      const { success, title, lastUpdateTimestamp } = await getDetailByTokenId(
        i
      );
      if (success) {
        blogs[endIdx - i] = {
          id: i,
          title: title,
          updateTime: new Date(Number(lastUpdateTimestamp)).toLocaleString(),
        };
      } else {
        setItems(null);
        messageApi.error("无法获取Blog信息!");
        return;
      }
    }
    setItems(blogs);
    setLoading(false);
  };

  useEffect(() => {
    homepageUrl.current = window.location.href;
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      {contextHolder}
      {loading ? (
        <h2>Loading...</h2>
      ) : items.length > 0 ? (
        items.map((item) => (
          <a key={item.id} href={homepageUrl.current + "#" + item.id}>
            <Card className="glass-container" key={item.id} bordered={true}>
              <h1>{item.title}</h1>
              <h4>最近更新时间: {item.updateTime}</h4>
            </Card>
          </a>
        ))
      ) : (
        <h2>No Blog to display!</h2>
      )}
      {loading ? (
        <div></div>
      ) : (
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={tokenId}
          pageSize={PAGE_SIZE}
        />
      )}
    </div>
  );
}
