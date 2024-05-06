import WalletConnect from "../connectWallet/Walletconnect";
import HamburgerMenu from "../homepage/hamburger";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
});

const style = {
  headerItems: `md:block hidden flex items-center justify-end text-xl`,
  logoContainer: `flex items-center cursor-pointer `,
  logoText: ` ml-[0.8rem] text-white text-2xl`,
  space: `flex flex-1 mx-[0.5rem] w-max-[500px] items-center`,
  headerItem: ` text-white px-3 py-2 font-light text-[#c8cacd] hover:text-white cursor-pointer `,
  wrapper: `bg-transparent w-full px-3 pt-3 flex before:blur `,
};

const Header = () => {
  return (
    <>
      <section id="home">
        <div className={style.wrapper}>
          <a href="/">
            <div className={style.logoContainer}>
              <Image src="/video-01.png" alt="logo" height={48} width={48} />
              <div
                style={{
                  fontSize: "30px",
                  fontSize: "xx-large",
                  fontWeight: "500",
                }}
                className={outfit.className}
              >
                DevJAM
              </div>
            </div>
          </a>

          <div className={style.space}></div>

          <div className={style.headerItems} style={{ paddingTop: "5px" }}>
            <a
              href="#home"
              style={{ fontWeight: "normal", padding: "12px 12px 0px 12px" }}
              className={outfit.className}
            >
              {" "}
              Home{" "}
            </a>
          </div>

          <div className={style.headerItems} style={{ paddingTop: "5px" }}>
            <a
              href="#about"
              style={{ fontWeight: "normal", padding: "12px 12px 0px 12px" }}
              className={outfit.className}
            >
              {" "}
              About{" "}
            </a>
          </div>

          <div className={style.headerItems} style={{ paddingTop: "5px" }}>
            <a
              href="#category"
              style={{ fontWeight: "normal", padding: "12px 12px 0px 12px" }}
              className={outfit.className}
            >
              {" "}
              Categories{" "}
            </a>
          </div>

          <div className={style.headerItems} style={{ paddingTop: "5px" }}>
            <a
              href="#footer"
              style={{ fontWeight: "normal", padding: "12px 12px 0px 12px" }}
              className={outfit.className}
            >
              {" "}
              Contact{" "}
            </a>
          </div>
          <div className={style.headerItems}>
            <WalletConnect />
          </div>
        </div>
        <HamburgerMenu />
        <Image
          src="/line.svg"
          alt="line"
          width={256}
          height={256}
          style={{ width: "100%" }}
        />
      </section>
    </>
  );
};

export default Header;