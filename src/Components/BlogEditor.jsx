import React, { useState, useEffect } from "react";
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { useBlogEditorStore } from "../store/BlogStore";
import { imageToArweave } from "../service/arweaveService";
import { message } from "antd";

export default function BlogEditor() {
  const [messageApi, contextHolder] = message.useMessage();
  const { blogEditorValue, setBlogEditorValue } = useBlogEditorStore();

  const [editor, setEditor] = useState(null);

  const toolbarConfig = {
    excludeKeys: ["group-video"],
  };
  const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        maxFileSize: 4 * 1024 * 1024,
        maxNumberOfFiles: 999,
        timeout: 60 * 1000,
        async customUpload(file, insertFn) {
          const { success, data } = await imageToArweave(file);
          if (!success) {
            messageApi.error("图片上传Arweave失败! 请检查网络后重试");
          }
          insertFn(data, "", data);
        },
      },
    },
  };

  useEffect(() => {
    return () => {
      if (editor === null) return;

      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <div>
      {contextHolder}
      <div className="blog-editor">
        <Toolbar
          className="toolbar"
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
        />
        <Editor
          className="editor"
          defaultConfig={editorConfig}
          value={blogEditorValue}
          onCreated={setEditor}
          onChange={(editor) => setBlogEditorValue(editor.getHtml())}
          mode="default"
        />
      </div>
    </div>
  );
}
