import { useState } from "react";
import { createStore } from "hox";

export const [useBlogItemsStore, BlogItemsStoreProvider] = createStore(() => {
  const [blogItems, setBlogItems] = useState([]);

  return {
    blogItems,
    setBlogItems,
  };
});

export const [useBlogEditorStore, BlogEditorStoreProvider] = createStore(() => {
  const [blogEditorTitle, setBlogEditorTitle] = useState("");
  const [blogEditorValue, setBlogEditorValue] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [editState, setEditState] = useState(false);
  const [ownerCheck, setOwnerCheck] = useState(false);

  return {
    blogEditorTitle,
    setBlogEditorTitle,
    blogEditorValue,
    setBlogEditorValue,
    blogUrl,
    setBlogUrl,
    editState,
    setEditState,
    ownerCheck,
    setOwnerCheck,
  };
});
