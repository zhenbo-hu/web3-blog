import { Suspense, lazy } from "react";
import { BlogItemsStoreProvider } from "../store/BlogStore";
const BlogList = lazy(() => import("./BlogList"));
const BlogLoading = lazy(() => import("./BlogLoading"));

export default function BlogContent() {
  return (
    <BlogItemsStoreProvider>
      <Suspense fallback={<BlogLoading />}>
        <BlogList />
      </Suspense>
    </BlogItemsStoreProvider>
  );
}
