import { Recorder } from "@huddle01/server-sdk/recorder";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    if (!roomId) {
        return new Response("Missing roomId", { status: 400 });
    }

    const recorder = new Recorder(
        process.env.NEXT_PUBLIC_PROJECT_ID!,
        process.env.API_KEY!
    );

    const recording = await recorder.stop({
        roomId: roomId,
    });

    return new Response(JSON.stringify(recording), {
        status: 200,
    });
}