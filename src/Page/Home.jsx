import { lazy, useEffect, Suspense } from "react";
import { useWallet } from "../store/Wallet";
import { defaultProvider } from "../service/connectService";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogContent = lazy(() => import("../Components/BlogContent"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));
const BlogLoading = lazy(() => import("../Components/BlogLoading"));

export default function Home() {
  const { ethersProvider, setEthersProvider } = useWallet();

  useEffect(() => {
    if (ethersProvider === null) {
      setEthersProvider(defaultProvider());
    }
  }, [ethersProvider, setEthersProvider]);

  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogLayout>
        <div className="main">
          <Suspense fallback={<BlogLoading />}>
            <BlogHeader />
          </Suspense>
          <Suspense fallback={<BlogLoading />}>
            <BlogContent />
          </Suspense>
        </div>
        <Suspense fallback={<BlogLoading />}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
