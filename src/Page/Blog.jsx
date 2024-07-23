import { lazy, Suspense } from "react";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));
const BlogItem = lazy(() => import("../Components/BlogItem"));
const BlogLoading = lazy(() => import("../Components/BlogLoading"));

export default function Blog() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogLayout>
        <div className="main">
          <Suspense fallback={<BlogLoading />}>
            <BlogHeader />
          </Suspense>
          <Suspense fallback={<BlogLoading />}>
            <BlogItem />
          </Suspense>
        </div>
        <Suspense fallback={<BlogLoading />}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
