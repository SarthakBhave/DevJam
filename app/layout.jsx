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
                        clientId="da9688429757dd629ac6c298bde81248"
                    >
                        {children}
                    </ThirdwebProvider>
                </HuddleContextProvider>

            </body>
        </html>
    );
}
