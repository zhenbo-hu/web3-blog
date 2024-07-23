import { Card } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  getDetailByTokenId,
  getWeb3BlogTokenId,
} from "../service/web3BlogService";

export default function BlogList() {
  // const location = useLocation();
  const homepageUrl = useRef("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const { success, data } = await getWeb3BlogTokenId();
    const len = data;
    let blogs = new Array(len);
    if (success) {
      for (let i = len; i > 0; i--) {
        const { success, title, lastUpdateTimestamp } =
          await getDetailByTokenId(i);
        if (success) {
          blogs[len - i] = {
            id: i,
            title: title,
            updateTime: new Date(Number(lastUpdateTimestamp)).toLocaleString(),
          };
        }
      }
      setItems(blogs);
    } else {
      alert("Get tokenId failed!");
    }

    setLoading(false);
  };

  useEffect(() => {
    homepageUrl.current = window.location.href;
    fetchBlogs();
  }, []);

  return (
    <div className="blog-list">
      {loading ? (
        <h2>Loading...</h2>
      ) : items.length > 0 ? (
        items.map((item) => (
          <a href={homepageUrl.current + "#" + item.id}>
            <Card className="glass-container" key={item.id} bordered={true}>
              <h1>{item.title}</h1>
              <h3>lastUpdateTime: {item.updateTime}</h3>
            </Card>
          </a>
        ))
      ) : (
        <h2>No Blog to display!</h2>
      )}
    </div>
  );
}
