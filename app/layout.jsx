"use client";

import "./globals.css";
import { Outfit } from "next/font/google";
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { metamaskWallet, coinbaseWallet, walletConnect, PhantomWallet, phantomWallet, rainbowWallet, trustWallet, zerionWallet } from "@thirdweb-dev/react";
import HuddleContextProvider from "@/context/HuddleContextProvider";

const outfit = Outfit({ subsets: ["latin"] });


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${outfit.className}`}>
                <HuddleContextProvider>
                    <ThirdwebProvider
                        supportedWallets={[
                            metamaskWallet({
                                recommended: true,
                            }),
                            coinbaseWallet(),
                            walletConnect(),
                            phantomWallet(),
                            rainbowWallet(),
                            trustWallet(),
                            zerionWallet(),
                        ]}
                        clientId="8152097800b0e5d24fb8beebc2f063ca"
                    >
                        {children}
                    </ThirdwebProvider>
                </HuddleContextProvider>

            </body>
        </html>
    );
}
