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
import { arweaveGateway, MAX_TITLE_LENGTH } from "../config";
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
  const [titleLoading, setTitleLoading] = useState(0);
  const [contentLoading, setContentLoading] = useState(0);
  const [tokenId, setTokenId] = useState(-1);

  useEffect(() => {
    const loc = window.location.href.split("#")[1].split("/")[0];
    if (loc !== "edit") {
      getExistBlog(Number(loc));
      setTokenId(Number(loc));
      setEditState(true);
      return;
    } else {
      setBlogEditorTitle("");
      setBlogEditorValue("");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (blogEditorTitle.length >= MAX_TITLE_LENGTH * 0.85) {
      messageApi.error(
        `标题最长不可超过${MAX_TITLE_LENGTH}字符, 当前长度为${blogEditorTitle.length}`
      );
    }
  }, [blogEditorTitle, messageApi]);

  const getExistBlog = async (id) => {
    setTitleLoading(1);
    setContentLoading(1);

    await getBlogContent(id);
    await getBlogTitle(id);

    setTitleLoading(0);
    setContentLoading(0);
  };

  const getBlogTitle = async (id) => {
    // eslint-disable-next-line
    const { success, title, lastUpdateTimestamp } = await getDetailByTokenId(
      id
    );
    if (!success) {
      messageApi.err("无法获取到Blog标题!");
      return;
    }

    setBlogEditorTitle(title);
  };

  const getBlogContent = async (id) => {
    const { success, data } = await getTokenUri(id);
    if (!success) {
      messageApi.error("无法获取Blog内容Id!");
      return;
    }

    const url = arweaveGateway + data;
    axios
      .get(url)
      .then((data) => {
        setBlogEditorValue(data.data);
      })
      .catch((err) => {
        messageApi.error("无法获取Blog内容!");
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
      messageApi.error("Blog上传至Arweave失败, 请检查网络并重试!");
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
      messageApi.error("请先连接钱包!");
      setMintLoading(false);
      return;
    }
    if (blogUrl.length === 0) {
      messageApi.error("请先点击上传按钮将内容上传至Arweave!");
      setMintLoading(false);
      return;
    }

    if (blogEditorTitle.length === 0) {
      messageApi.error("请输入Blog标题!");
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
      messageApi.error("请先连接钱包!");
      setMintLoading(false);
      return;
    }
    if (blogUrl.length === 0) {
      messageApi.error("请先点击上传按钮将内容上传至Arweave!");
      setMintLoading(false);
      return;
    }

    if (blogEditorTitle.length === 0) {
      messageApi.error("请输入Blog标题!");
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
      <div className="blog-edit">
        <div className="blog-edit-item-1">
          <input
            className="input"
            value={blogEditorTitle}
            placeholder="请输入标题...(上限100字符)"
            onChange={handleTitleChange}
            type="text"
            maxLength={MAX_TITLE_LENGTH}
            loading={titleLoading}
          />

          {contentLoading ? (
            <Skeleton />
          ) : (
            <Suspense fallback={<BlogLoading />}>
              <BlogEditor />
            </Suspense>
          )}

          <div className="blog-edit-button">
            {contextHolder}
            <Button
              className="button"
              onClick={uploadBlogToArweave}
              loading={uploadLoading}
            >
              上传至Arweave
            </Button>
            <Button
              className="primary-button"
              onClick={!editState ? mintBlog : updateBlog}
              loading={mintLoading}
            >
              {!editState ? "首次发布" : "更新并发布"}
            </Button>
          </div>
        </div>
        <div className="blog-edit-item">
          <h1 className="blog-title">{blogEditorTitle}</h1>
          <div className="blog-item">
            <div dangerouslySetInnerHTML={{ __html: blogEditorValue }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
