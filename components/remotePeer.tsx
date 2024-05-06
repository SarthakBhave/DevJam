import { PeerMetadata } from '@/utils/types';
import {
    useLocalScreenShare,
    useRemoteAudio,
    useRemotePeer,
    useRemoteScreenShare,
    useRemoteVideo,
} from '@huddle01/react/hooks';
import Video from './Media/Video';
import Audio from './Media/Audio';
import GridContainer from './GridContainer';
import clsx from 'clsx';
import { useStudioState } from '@/store/studioState';
import React from 'react';

interface RemotePeerProps {
    peerId: string;
}

const RemotePeer = ({ peerId }: RemotePeerProps) => {
    const { stream: videoStream } = useRemoteVideo({ peerId });
    const { stream: audioStream } = useRemoteAudio({ peerId });
    const { metadata } = useRemotePeer<PeerMetadata>({ peerId });
    const { isScreenShared } = useStudioState();

    return (
        <GridContainer
            className={clsx(isScreenShared ? 'w-full h-full my-3 mx-1' : '')}
        >
            {metadata?.isHandRaised && (
                <span className='absolute top-4 right-4 text-4xl text-gray-200 font-medium'>
                    ✋
                </span>
            )}
            {videoStream ? (
                <Video stream={videoStream} name={metadata?.displayName ?? 'guest'} />
            ) : (
                <div className='flex text-3xl font-semibold items-center justify-center w-24 h-24 bg-gray-700 text-gray-200 rounded-full'>
                    {metadata?.displayName?.[0].toUpperCase()}
                </div>
            )}
            <span className='absolute bottom-4 left-4 text-gray-200 font-medium'>
                {metadata?.displayName}
            </span>
            {audioStream && (
                <Audio stream={audioStream} name={metadata?.displayName ?? 'guest'} />
            )}
        </GridContainer>
    );
};

export default RemotePeer;