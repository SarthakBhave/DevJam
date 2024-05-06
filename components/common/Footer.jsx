import React from "react";
import Image from "next/image";
const style = {
  container: `text-center  text-white font-bold text-3xl mt-16 `,
  flexContainer: `flex flex-wrap justify-between pt-4 px-5 pb-0`, 
  flexContainer1: `flex flex-wrap justify-between pb-4 px-5 pt-0`, 
  logoContainer: `flex items-center`,
  logoText: `text-3xl font-semibold ml-2`,
  linkList: `text-base font-light text-right text-l `,
  copyrightText: `text-base font-light cursor-pointer  `,
};

const Footer = () => {
  return (
    <section id="footer">
      <div
        className={style.container}
        style={{ backgroundColor: "#1B1B1E" }}>
        <div className={style.flexContainer}>
        <a href="/" style={{display:"flex" }}>
          <div className={style.logoContainer}>
            <Image
              src="/video-01.png"
              alt="DevJAM Logo"
              height={48}
              width={48}
            />
            <div className={style.logoText}>DevJAM</div>
          </div></a>
          <div className={style.linkList}>
            <p>
              <a href="#home">Home</a>
            </p>
            <p>
              <a href="#about">About</a>
            </p>
            <p>
              <a href="#category">Categories</a>
            </p>
            <p>
              <a href="#home">Connect Wallet</a>
            </p>
          </div>
        </div>
        <Image
          src="/line.svg"
          alt="line"
          width={256}
          height={256}
          style={{ width: "100%" }}
        />
        <div className={style.flexContainer1}>
          <div className={style.copyrightText}>&copy;2024 DevJam</div>
          <div className={style.copyrightText}>
            Copyrights Reserved&emsp;&emsp;Terms & Conditions
          </div>
        </div>
        <style>
          {`
          @media screen and (max-width: 768px) {
            .flexContainer {
              flex-direction: column;
              padding: 10px 10px;
            }
            .logoText {
              margin-top: 10px;
            }
            .linkList {
              margin-top: 20px;
              text-align: center;
            }
          }
        `}
        </style>
      </div>
    </section>
  );
};

export default Footer;