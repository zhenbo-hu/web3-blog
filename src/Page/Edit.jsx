import React, { Suspense, lazy } from "react";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogEdit = lazy(() => import("../Components/BlogEdit"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));

export default function Edit() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogHeader />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogEdit />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
