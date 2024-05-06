import React from "react";
import { Base } from "@thirdweb-dev/chains";
import { ConnectWallet } from "@thirdweb-dev/react";

const WalletConnect = () => {
    const displayBalanceToken = {
        [Base.chainId]: "0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe",
        [Base.chainId]: "75D1c5WvFFJDSYW8Xdj5w4e81PZz5XfYxWUHGuvsCRtH",
    };

    return (
        <ConnectWallet
            style={{
                color: "white",
                borderRadius: "13px",
                height: "40px",
                width: "158px",
                background: "transparent",
                backdropFilter: "blur(10px)",
                position: "relative",
                border: "2px solid white",
            }}
            displayBalanceToken={displayBalanceToken}
        />
    );
};

export default WalletConnect;
