import { lazy, Suspense } from "react";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));
const BlogItem = lazy(() => import("../Components/BlogItem"));

export default function Blog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogHeader />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogItem />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
