"use client";
import React, {useState, useEffect} from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { createRoom } from '@/utils/createRoom';
import { Huddle01RoomData } from "@/lib/Huddle01RoomData";
import { useConnectionStatus } from "@thirdweb-dev/react";
export default function RoomsDetails() {
    const router = useRouter();
    const [connectionStatus, setConnectionStatus] = useState(null);
    const status = useConnectionStatus();

    const goToRoom = async (roomId) => {
        router.push(`room/${roomId}/lobby`);
    }

    const createNewRoom = async () => {
        const roomId = await createRoom();
        console.log("roomId", roomId);
        router.push(`room/${roomId}/lobby`);
    }

    useEffect(() => {
        setConnectionStatus(status);
      }, [status]);

    return (
        <>
     <section id="category">
        <div className="w-full py-12 bg-[#0c0b10] mt-20">
            <div className="w-full max-w-[90%] mx-auto">
                <h1 className="text-4xl font-bold text-white text-center py-8 pb-16">CATEGORIES</h1>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 justify-evenly">
                    {Huddle01RoomData.map((room) => (
                        <div key={room.id} className="w-full flex flex-col bg-[#1e1e1e] rounded-lg">
                            <Image src={room.ImageSRC} alt={room.roomName} width={1080} height={1080} className="p-4 aspect-video object-cover" />
                            <div className="p-6 pt-0 flex flex-col">
                                <h2 className="text-white text-xl font-bold">{room.roomName}</h2>
                                <p className="text-white text-sm">{room.roomDescription}</p>
                                <div className="flex justify-end pt-4">
                                    <button
                                        className="px-3 pt-1 border-white border-[1px] rounded-3xl w-32 h-8 flex justify-evenly" 
                                        onClick={() => { connectionStatus === "connected"? goToRoom(room.roomId) : alert("Connect Wallet to Join Call");
                                        }}
                                    >
                                        Join Call
                                        <Image src="/right.png" width={20} height={20}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
    </>
    );
}