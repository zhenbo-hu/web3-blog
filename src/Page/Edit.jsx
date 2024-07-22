import React, { Suspense, lazy } from "react";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogEdit = lazy(() => import("../Components/BlogEdit"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));
const BlogLoading = lazy(() => import("../Components/BlogLoading"));

export default function Edit() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogLayout>
        <Suspense fallback={<BlogLoading />}>
          <BlogHeader />
        </Suspense>
        <Suspense fallback={<BlogLoading />}>
          <BlogEdit />
        </Suspense>
        <Suspense fallback={<BlogLoading />}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
