import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import { Recorder } from '@huddle01/server-sdk/recorder';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get('roomId');

    if (!roomId) {
        return new Response('Missing roomId', { status: 400 });
    }

    const accessToken = new AccessToken({
        apiKey: process.env.API_KEY!,
        roomId: roomId as string,
        role: Role.BOT,
        permissions: {
            admin: false,
            canConsume: true,
            canProduce: false,
            canProduceSources: {
                cam: false,
                mic: false,
                screen: false,
            },
            canRecvData: true,
            canSendData: true,
            canUpdateMetadata: true,
        },
    });

    const token = await accessToken.toJwt();

    const recorder = new Recorder(
        process.env.NEXT_PUBLIC_PROJECT_ID!,
        process.env.API_KEY!
    );

    console.log('token', token);
    console.log('roomId', roomId);

    const recording = await recorder.startRecording({
        roomId: roomId as string,
        token,
    });

    console.log('recording started', recording);

    return new Response(JSON.stringify(recording), {
        status: 200,
    });
}