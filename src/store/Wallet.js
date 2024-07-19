import { createStore } from "hox";
import { useState } from "react";

export const [useWallet, WalletProvider] = createStore(() => {
  const [wallet, setWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState(() => {
    const address = localStorage.getItem('address');
    if (address !== null) {
        return address;
    }
    return "";
  });
  const [ethersProvider, setEthersProvider] = useState(null);
  const [ethersSigner, setEthersSignerProvider] = useState(null);
  const [ownerAddress, setOwnerAddress] = useState("");

  return {
    wallet,
    setWallet,
    walletAddress,
    setWalletAddress,
    ethersProvider,
    setEthersProvider,
    ethersSigner,
    setEthersSignerProvider,
    ownerAddress,
    setOwnerAddress,
  };
});
