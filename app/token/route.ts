import { AccessToken, Role } from '@huddle01/server-sdk/auth';

export const dynamic = 'force-dynamic';

const createToken = async (
    roomId: string,
    role: string,
    displayName: string
) => {
    const accessToken = new AccessToken({
        apiKey: process.env.API_KEY!,
        roomId: roomId as string,
        role: role,
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
        options: {
            metadata: {
                displayName,
                isHandRaised: false,
            },
        },
    });

    const token = await accessToken.toJwt();

    return token;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const roomId = searchParams.get('roomId');
    const displayName = searchParams.get('displayName');

    if (!roomId || !displayName) {
        return new Response('Invalid Request', { status: 400 });
    }

    let token: string;

    try {
        const response = await fetch(
            `https://iriko.huddle01.media/api/v1/live-meeting/preview-peers?roomId=${roomId}`,
            {
                headers: {
                    'x-api-key': process.env.API_KEY ?? '',
                },
            }
        );
        const data = await response.json();
        console.log(data);
        const { previewPeers } = data;

        token = await createToken(
            roomId,
            previewPeers.length > 0 ? Role.GUEST : Role.HOST,
            displayName
        );
    } catch (error) {
        token = await createToken(roomId, Role.HOST, displayName);
    }

    return new Response(token, { status: 200 });
}