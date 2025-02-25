import { TranscriptResponse, YoutubeTranscript } from "youtube-transcript";
import { TranscriptError, TranscriptSegment } from "./types";

export class TranscriptService {
  static async getTranscript(videoId: string): Promise<TranscriptSegment[]> {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);

      return this.formatTranscript(transcript);
    } catch (error) {
      const errorMessage = (error as Error).message.toLowerCase();

      if (
        errorMessage.includes("no transcript") ||
        errorMessage.includes("transcript unavailable") ||
        errorMessage.includes("could not find transcript")
      ) {
        throw new TranscriptError(
          "No transcript available for this video. The video might not have captions, or they might be disabled.",
          "NO_TRANSCRIPT"
        );
      }

      throw new TranscriptError(
        `Failed to fetch transcript: ${(error as Error).message}`,
        "GENERAL_ERROR"
      );
    }
  }

  private static formatTranscript(
    transcript: TranscriptResponse[]
  ): TranscriptSegment[] {
    if (!transcript || transcript.length === 0) {
      throw new TranscriptError(
        "Transcript is empty or invalid",
        "NO_TRANSCRIPT"
      );
    }

    return transcript.map((item) => ({
      text: item.text,
      start: item.offset,
      duration: item.duration,
    }));
  }
}
