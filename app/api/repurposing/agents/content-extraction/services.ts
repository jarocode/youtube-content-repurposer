// import { TranscriptResponse, YoutubeTranscript } from "youtube-transcript";

import { YoutubeTranscript as YoutubeTranscriptAPI } from "@danielxceron/youtube-transcript";
import { TranscriptError } from "./types";

export class TranscriptService {
  static async getTranscript(videoId: string) {
    try {
      const transcript = await this.extractor(videoId);
      return transcript;
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

  static async extractor(videoId: string) {
    try {
      const transcript = await YoutubeTranscriptAPI.fetchTranscript(videoId);
      console.log("transcript:", transcript);
      return transcript;
    } catch (error) {
      console.error("error extracting transcript", error);
      throw new Error((error as Error).message);
    }
  }
}
