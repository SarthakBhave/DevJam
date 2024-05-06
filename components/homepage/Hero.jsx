import Image from "next/image";
import Header from "@/components/common/Header";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],  
});

export default function HeroSection() {
    return (

  <div className="relative w-full" >
            <Image src="/background Image.webp" alt="Background Image" width={1920} height={1080} className="absolute w-full aspect-video z-[-1]" />
            <Header />
         
    <div style={{
            marginTop: "100px",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}  >
          <div style={{
              fontSize:"xx-large",
              textAlign: "center",
              fontWeight:"300"}}
          className={outfit.className}>
            Welcome to
            <br />
            <div
              style={{
                textAlign: "center",
                fontSize: "90px",
                fontWeight:"400"
              }}
              className={outfit.className}
            >
              DevJAM
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            alignItems: "center",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              fontSize: "40px",
              color:"white",
              fontWeight:"normal"
            }}
            className={outfit.className}
          >
            "Connect, Share & Collaborate with like-minded developers"
          </div>
        </div>
        
  </div>
   
  );
}
