import { Suspense, lazy, useEffect, useState } from "react";
import { useBlogEditorStore } from "../store/BlogStore";
import { useWallet } from "../store/Wallet";
import { storeArweave } from "../service/arweaveService";
import {
  getDetailByTokenId,
  getTokenUri,
  getWeb3BlogTokenId,
  safeMint,
  updateNFT,
} from "../service/web3BlogService";
import { Button, message, Skeleton } from "antd";
import axios from "axios";
import { arweaveGateway } from "../config";
const BlogEditor = lazy(() => import("./BlogEditor"));
const BlogLoading = lazy(() => import("./BlogLoading"));

export default function BlogEdit() {
  const [messageApi, contextHolder] = message.useMessage();

  const {
    blogEditorTitle,
    setBlogEditorTitle,
    blogEditorValue,
    setBlogEditorValue,
    blogUrl,
    setBlogUrl,
    editState,
    setEditState,
  } = useBlogEditorStore();

  const { ethersSigner } = useWallet();

  const [uploadLoading, setUploadLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [tokenId, setTokenId] = useState(-1);

  useEffect(() => {
    const loc = window.location.href.split("#")[1].split("/")[0];
    if (loc !== "edit") {
      getExistBlog(Number(loc));
      setTokenId(Number(loc));
      setEditState(true);
      return;
    }
    // eslint-disable-next-line
  }, []);

  const getExistBlog = async (id) => {
    setTitleLoading(true);
    setContentLoading(true);

    await getBlogTitle(id);
    setTitleLoading(false);

    await getBlogContent(id);
    setContentLoading(false);
  };

  const getBlogTitle = async (id) => {
    // eslint-disable-next-line
    const { success, title, lastUpdateTimestamp } = await getDetailByTokenId(
      id
    );
    if (!success) {
      alert("Get token title failed!");
      return;
    }

    setBlogEditorTitle(title);
  };

  const getBlogContent = async (id) => {
    const { success, data } = await getTokenUri(id);
    if (!success) {
      alert("Get tokenUri failed!");
      return;
    }

    const url = arweaveGateway + data;
    axios
      .get(url)
      .then((data) => {
        setBlogEditorValue(data.data);
      })
      .catch((err) => {
        alert("Fetch blog content failed!");
      });
  };

  const handleTitleChange = (e) => {
    setBlogEditorTitle(e.target.value);
  };

  const uploadBlogToArweave = async () => {
    setUploadLoading(true);
    const tags = {
      "Content-Type": "text/html",
      "Domain-Type": "article",
      "blog-title": blogEditorTitle,
    };
    const { success, data } = await storeArweave(blogEditorValue, tags);
    if (!success) {
      messageApi.error("Upload blog to Arweave failed, please check network and retry!");
      setUploadLoading(false);
      return;
    }

    messageApi.success(data);
    setBlogUrl(data);
    setUploadLoading(false);
  };

  const mintBlog = async () => {
    const updateTimestamp = new Date().getTime();

    setMintLoading(true);
    if (ethersSigner === null) {
      alert("Connect Wallet first!");
      setMintLoading(false);
      return;
    }
    if (blogUrl.length === 0) {
      alert("Upload first!");
      setMintLoading(false);
      return;
    }

    if (blogEditorTitle.length === 0) {
      alert("Please input blog title!");
      setMintLoading(false);
      return;
    }

    const rst = await safeMint(
      ethersSigner,
      blogEditorTitle,
      updateTimestamp.toString(),
      blogUrl
    );
    if (rst.success) {
      messageApi.success("发布成功");
    } else {
      messageApi.error("发布失败");
    }
    setMintLoading(false);

    if (rst.success) {
      const { success, data } = await getWeb3BlogTokenId();
      if (success) {
        window.location.assign(`#${data}`);
      }
    }
  };

  const updateBlog = async () => {
    const updateTimestamp = new Date().getTime();

    setMintLoading(true);
    if (ethersSigner === null) {
      alert("Connect Wallet first!");
      setMintLoading(false);
      return;
    }
    if (blogUrl.length === 0) {
      alert("Upload first!");
      setMintLoading(false);
      return;
    }

    if (blogEditorTitle.length === 0) {
      alert("Please input blog title!");
      setMintLoading(false);
      return;
    }

    const rst = await updateNFT(
      ethersSigner,
      tokenId,
      blogEditorTitle,
      updateTimestamp.toString(),
      blogUrl
    );
    if (rst.success) {
      messageApi.success("更新并发布成功");
    } else {
      messageApi.error("更新并发布失败");
    }
    setMintLoading(false);

    if (rst.success) {
      const { success, data } = await getWeb3BlogTokenId();
      if (success) {
        window.location.assign(`#${data}`);
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1, padding: "10px" }}>
          <input
            className="input-class"
            value={blogEditorTitle}
            placeholder="请输入标题...(上限100字符)"
            onChange={handleTitleChange}
            type="text"
            maxLength={100}
            loading={titleLoading}
          />

          {contentLoading ? (
            <Skeleton />
          ) : (
            <Suspense fallback={<BlogLoading />}>
              <BlogEditor />
            </Suspense>
          )}

          <div
            style={{
              display: "flex",
              margin: "1px",
              justifyContent: "space-evenly",
            }}
          >
            {contextHolder}
            <Button
              className="button-class"
              onClick={uploadBlogToArweave}
              loading={uploadLoading}
            >
              Upload to Arweave
            </Button>
            <Button
              className="primary-button-class"
              onClick={!editState ? mintBlog : updateBlog}
              loading={mintLoading}
            >
              {!editState ? "Mint" : "Update"}
            </Button>
          </div>
        </div>
        <div style={{ flex: 1, padding: "2px" }}>
          <h1 className="blog-title">{blogEditorTitle}</h1>
          <div className="blog-item">
            <div dangerouslySetInnerHTML={{ __html: blogEditorValue }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
