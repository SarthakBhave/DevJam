import { usePeerIds } from "@huddle01/react/hooks";
import PeerData from "./peerData";
import RequestedPeers from "./requestedPeers";
import { useStudioState } from "@/store/studioState";
import clsx from "clsx";
import React from "react";

const ParticipantsBar = () => {
    const { peerIds } = usePeerIds();
    const { requestedPeers } = useStudioState();

    return (
        <aside className="w-80 bg-gray-800 h-full mr-4 rounded-lg transition-all duration-300 ease-in-out">
            <div className="mb-6">
                {requestedPeers.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <span className="text-center text-gray-200">
                            Requests for Mainstage
                        </span>
                        <div className="p-2 rounded-lg bg-gray-800">
                            {requestedPeers.map((peerId) => (
                                <RequestedPeers peerId={peerId} key={peerId} />
                            ))}
                        </div>
                    </div>
                )}
                <div className="px-4 py-2 border-b border-gray-700">
                    <h1 className="text-xl font-semibold">Participants</h1>
                </div>
                <div className="flex flex-col gap-2 mt-2 px-4 py-2">
                    {peerIds.map((peerId) => (
                        <PeerData peerId={peerId} key={peerId} />
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default ParticipantsBar;