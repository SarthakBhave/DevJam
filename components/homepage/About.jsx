import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about">
        <div className="w-full bg-[#0c0b10] mt-32">
            <div className="w-full flex max-w-[90%] mx-auto flex-col">
                <h1 className="text-4xl font-semibold text-white text-center py-4">ABOUT</h1>
                <div className="grid grid-cols-2 max-sm:grid-cols-1">
                    <div className="">
                        <Image src="/aboutImage.svg" alt="About Image" width={1920} height={1920} className="w-full" />
                    </div>
                    <div className="text-justify text-lg flex items-center">
                        <div className="flex flex-col gap-4">
                            <p>
                                Devjam is a Web3 video chat platform that connects users with niche-based interests using blockchain technology, providing a secure and private space to discover and share passions, and build meaningful connections.
                            </p>
                            <p>
                                With Devjam, users can join category-based meets to connect with others who share the same passions. Whether you&apos;re a developer looking to connect with fellow coders or a designer seeking like-minded creatives, Devjam provides a unique and engaging platform to spark meaningful conversations and build long-lasting connections.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
}