import { Suspense, lazy } from "react";
import { BlogItemsStoreProvider } from "../store/BlogStore";
// import BlogList from "./BlogList";
const BlogList = lazy(() => import("./BlogList"));

export default function BlogContent() {
  return (
    <BlogItemsStoreProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogList />
      </Suspense>
    </BlogItemsStoreProvider>
  );
}
