'use client';
import Image from 'next/image';
import Video from '@/components/Media/Video';
import ChangeDevice from '@/components/changeDevice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useStudioState } from '@/store/studioState';
import { BasicIcons } from '@/utils/BasicIcons';
import { PeerMetadata } from '@/utils/types';
import {
    useDevices,
    useLocalMedia,
    useLocalPeer,
    useRoom,
} from '@huddle01/react/hooks';
import { useLocalAudio, useLocalVideo } from '@huddle01/react/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const Lobby = ({ params }: { params: { roomId: string } }) => {
    const { isAudioOn, enableAudio, disableAudio } = useLocalAudio();
    const { stream, isVideoOn, enableVideo, disableVideo } = useLocalVideo();
    const { setPreferredDevice: setCamPrefferedDevice } = useDevices({
        type: 'cam',
    });
    const { setPreferredDevice: setAudioPrefferedDevice } = useDevices({
        type: 'mic',
    });
    const { audioInputDevice, videoDevice } = useStudioState();
    const { fetchStream } = useLocalMedia();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { name, setName } = useStudioState();
    const router = useRouter();
    const { updateMetadata, metadata } = useLocalPeer<PeerMetadata>();
    const [isJoining, setIsJoining] = useState(false);
    const { joinRoom } = useRoom({
        onJoin: () => {
            setIsJoining(false);
            router.push(`/room/${params.roomId}`);
        },
    });

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        setCamPrefferedDevice(videoDevice.deviceId);
        if (isVideoOn) {
            disableVideo();
            const changeVideo = async () => {
                const { stream } = await fetchStream({
                    mediaDeviceKind: 'cam',
                });
                if (stream) {
                    enableVideo(stream);
                }
            };
            changeVideo();
        }
    }, [videoDevice]);

    useEffect(() => {
        setAudioPrefferedDevice(audioInputDevice.deviceId);
        if (isAudioOn) {
            disableAudio();
            const changeAudio = async () => {
                const { stream } = await fetchStream({
                    mediaDeviceKind: 'mic',
                });
                if (stream) {
                    enableAudio(stream);
                }
            };
            changeAudio();
        }
    }, [audioInputDevice]);

    return (<>
        <div className='w-full border-b rounded-b-lg'>
            {/* <header className='flex items-center justify-between pt-4 px-4'> */}
            <header className='max-w-[95vw] w-full px-3 xl:p-0 my-5 mx-auto flex justify-between items-center'>
                <a href='/' className='flex'>
                    <Image src="/video-01.png" alt="logo" height={35} width={35} />
                    <h1 className='text-white text-3xl font-medium'>DevJam</h1>
                </a>
            </header>
        </div>
        <div className='w-full min-h-screen p-8 flex flex-col items-center justify-center text-gray-200'>

            <div className='flex justify-center items-center w-full max-w-md p-4 rounded-lg shadow'>
                <div className='flex flex-col gap-2'>
                    <span className='font-extrabold text-2xl'>
                        Let&apos;s check your cam and mic
                    </span>
                    <Card className='relative p-4 w-full h-full'>
                        <div className='w-full h-full min-w-60 min-h-48 bg-gray-800 rounded-lg'>
                            {stream && (
                                <Video
                                    stream={stream}
                                    name={metadata?.displayName ?? 'guest'}
                                />
                            )}
                        </div>
                        <div className='absolute bottom-6 right-0 left-0 justify-center flex gap-2 w-full'>
                            <ChangeDevice deviceType='cam'>
                                <button
                                    onClick={() => {
                                        if (isVideoOn) {
                                            disableVideo();
                                        } else {
                                            enableVideo();
                                        }
                                    }}
                                    className='bg-gray-800/50 rounded-md'
                                >
                                    {isVideoOn ? BasicIcons.on.cam : BasicIcons.off.cam}
                                </button>
                            </ChangeDevice>
                            <ChangeDevice deviceType='mic'>
                                <button
                                    onClick={() => {
                                        if (isAudioOn) {
                                            disableAudio();
                                        } else {
                                            enableAudio();
                                        }
                                    }}
                                    className='bg-gray-800/50 rounded-md'
                                >
                                    {isAudioOn ? BasicIcons.on.mic : BasicIcons.off.mic}
                                </button>
                            </ChangeDevice>
                            <ChangeDevice deviceType='speaker'>
                                <button className='bg-gray-800/50 rounded-md'>
                                    {BasicIcons.speaker}
                                </button>
                            </ChangeDevice>
                        </div>
                    </Card>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='bg-gray-800'
                        placeholder='Enter you name'
                    />
                    <Button
                        className='flex gap-2 bg-gray-200'
                        onClick={async () => {
                            if (!name) {
                                toast.error('Please enter your name');
                                return;
                            }
                            setIsJoining(true);
                            const response = await fetch(
                                `/token?roomId=${params.roomId}&displayName=${name}`
                            );
                            const token = await response.text();
                            await joinRoom({
                                roomId: params.roomId,
                                token,
                            });
                        }}
                        disabled={isJoining}
                    >
                        {isJoining ? (
                            <>
                                <span>{BasicIcons.spin}</span>
                                <span>Entering Room...</span>
                            </>
                        ) : (
                            'Enter Room'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    </>
    );
};

export default Lobby;