import { repurposeContentGraph } from "./agents/content-extraction/graph";

export async function POST(request: Request) {
  try {
    const { youtube_url } = await request.json();

    console.log("response:", youtube_url);

    const config = { configurable: { thread_id: "repurposing-num-1" } };

    const { repurposed_contents } = await repurposeContentGraph.invoke(
      { videoId: youtube_url },
      config
    );

    return Response.json(
      {
        success: true,
        data: repurposed_contents,
        message: "content repurposed successfully!",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    return Response.json(
      { success: false, message: error },
      {
        status: 500,
      }
    );
  }
}
