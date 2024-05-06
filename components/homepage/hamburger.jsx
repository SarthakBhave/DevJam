import React, { useState, useEffect } from "react";
import Image from "next/image";
import WalletConnect from "../connectWallet/Walletconnect";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
});

const style = {
  hamburgerMenuContainer: `relative md:hidden`,
  hamburgerMenuButton: `md:hidden block fixed top-0 right-0 text-white p-2 cursor-pointer `,
  mobileMenu: `absolute top-full left-0 right-0 backdrop-blur-lg border border-white/50 rounded-lg p-4 mt-2 shadow-lg md:hidden `,
  mobileMenuList: `list-none p-0 m-0`,
  mobileMenuWrapper: `fixed top-0 left-0 right-0 bottom-0  opacity-0 pointer-events-none transition ease-in-out duration-300 `,
  mobileMenuItem: `mb-2`,
  hamburgerMenuRight: `fixed top-0 right-0 mt-4 mr-4 md:hidden`,
  mobileMenuItemLink: `text-white font-medium text-base `,
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setVisible(currentScrollY === 0);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.hamburger-menu-container`) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div className={`${style.hamburgerMenuContainer} hamburger-menu-container`}>
      {visible && (
        <button
          className={style.hamburgerMenuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image
            src="/menu2.png"
            alt="menu"
            width={256}
            height={256}
            className="w-12 h-12"
          />
        </button>
      )}
      {isOpen && (
        <div
          className={style.mobileMenu}
          style={{ backdropFilter: "blur(6px)" }}
        >
          <ul className={style.mobileMenuList}>
            <li className={style.mobileMenuItem}>
              <a href="#home" className={style.mobileMenuItemLink}>
                Home
              </a>
            </li>
            <li className={style.mobileMenuItem}>
              <a href="#about" className={style.mobileMenuItemLink}>
                About
              </a>
            </li>
            <li className={style.mobileMenuItem}>
              <a href="#category" className={style.mobileMenuItemLink}>
                Category
              </a>
            </li>
            <li className={style.mobileMenuItem}>
              <a href="#footer" className={style.mobileMenuItemLink}>
                Contact
              </a>
            </li>
            <li className={style.mobileMenuItem}>
              <WalletConnect />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;