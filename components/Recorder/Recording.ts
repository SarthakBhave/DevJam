'use server';

import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import { Recorder } from '@huddle01/server-sdk/recorder';

export const startRecording = async (roomId: string) => {
    const token = new AccessToken({
        apiKey: process.env.API_KEY!,
        roomId: roomId,
        role: Role.BOT,
        permissions: {
            admin: true,
            canConsume: true,
            canProduce: true,
            canProduceSources: {
                cam: true,
                mic: true,
                screen: true,
            },
            canRecvData: true,
            canSendData: true,
            canUpdateMetadata: true,
        },
    });

    const accessToken = await token.toJwt();

    const recorder = new Recorder(
        process.env.NEXT_PUBLIC_PROJECT_ID!,
        process.env.API_KEY!
    );

    const record = await recorder.startRecording({
        roomId,
        token: accessToken,
        // options: {
        //   audioOnly: true,
        // },
    });

    return record;
};

export const stopRecording = async (roomId: string) => {
    const recorder = new Recorder(
        process.env.NEXT_PUBLIC_PROJECT_ID!,
        process.env.API_KEY!
    );

    const record = await recorder.stop({
        roomId,
    });

    if (record.msg === 'success') {
        console.log('Recording stopped');
    }

    return record;
};