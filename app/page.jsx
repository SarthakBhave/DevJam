"use client";


import HeroSection from "@/components/homepage/Hero";
import AboutSection from "@/components/homepage/About";
import RoomsDetails from '@/components/homepage/rooms';
import Footer from "@/components/common/Footer";
export default function Home() {
    return (
        <main className="">
            <HeroSection />
            <AboutSection />
            <RoomsDetails />
            <Footer/>

        </main>
    );
}
