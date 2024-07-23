import { useWallet } from "../store/Wallet";
import { Button, Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import { tryConnectWallet } from "../service/connectService";
import { getWeb3BlogOwner } from "../service/web3BlogService";
import { useBlogEditorStore } from "../store/BlogStore";

const { Header } = Layout;

export default function BlogHeader() {
  const homepageUrl = useRef("");

  const {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    setEthersProvider,
    setEthersSignerProvider,
    ownerAddress,
    setOwnerAddress,
  } = useWallet();

  const { editState, setEditState, ownerCheck, setOwnerCheck } =
    useBlogEditorStore();

  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState(0);

  useEffect(() => {
    const loc = window.location.href.split("#")[1];
    homepageUrl.current = window.location.href.split("#")[0];
    const locNum = Number(loc);

    if (loc !== "" && !isNaN(locNum)) {
      setEditState(true);
      setTokenId(locNum);
    }
  // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      ownerAddress !== "" &&
      walletAddress !== "" &&
      ownerAddress === walletAddress
    ) {
      setOwnerCheck(true);
    } else {
      setOwnerCheck(false);
    }
  }, [walletAddress, setWalletAddress, ownerAddress, setOwnerCheck]);

  const isOwner = async () => {
    const { success, data } = await getWeb3BlogOwner();
    if (success) {
      setOwnerAddress(data);
    }
  };

  const connectWallet = async () => {
    setLoading(true);
    await isOwner();
    if (!wallet) {
      const { provider, signer, address } = await tryConnectWallet();
      setEthersProvider(provider);
      setEthersSignerProvider(signer);
      setWalletAddress(address);
      if (address !== null) {
        setWallet(true);
      }
    } else {
      setEthersProvider(null);
      setEthersSignerProvider(null);
      setWalletAddress("");
      setWallet(false);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Header
        className="header-class"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <a
          style={{ color: "#FFF", flex: 1, minWidth: 0 }}
          href={homepageUrl.current}
        >
          <h1>Web3 Blog</h1>
        </a>

        {ownerCheck ? (
          <Button
            className="button-class"
            disabled={!ownerCheck}
          >
            <a href={homepageUrl.current + "#edit"}>New</a>
          </Button>
        ) : (
          <div></div>
        )}

        {editState && ownerCheck ? (
          <Button className="button-class">
            <a
              href={
                tokenId !== 0
                  ? homepageUrl.current + `#${tokenId}/edit`
                  : homepageUrl.current
              }
            >
              Edit
            </a>
          </Button>
        ) : (
          <div></div>
        )}

        <Button
          className="primary-button-class"
          onClick={connectWallet}
          loading={loading}
        >
          {wallet ? walletAddress : <div>Connect Wallet</div>}
        </Button>
      </Header>
    </Layout>
  );
}
