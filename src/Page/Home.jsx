import { lazy, useEffect, Suspense } from "react";
import { useWallet } from "../store/Wallet";
import { defaultProvider } from "../service/connectService";

const BlogLayout = lazy(() => import("../Components/BlogLayout"));
const BlogHeader = lazy(() => import("../Components/BlogHeader"));
const BlogContent = lazy(() => import("../Components/BlogContent"));
const BlogFooter = lazy(() => import("../Components/BlogFooter"));

export default function Home() {
  const { ethersProvider, setEthersProvider } = useWallet();

  useEffect(() => {
    if (ethersProvider === null) {
      setEthersProvider(defaultProvider());
    }
  }, [ethersProvider, setEthersProvider]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogHeader />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogContent />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <BlogFooter />
        </Suspense>
      </BlogLayout>
    </Suspense>
  );
}
