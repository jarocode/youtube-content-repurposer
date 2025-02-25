export interface TranscriptSegment {
  text: string;
  start: number;
  duration: number;
}

export interface TranscriptResponse {
  success: boolean;
  data?: {
    videoId: string;
    transcript: TranscriptSegment[];
  };
  error?: string;
  errorType?: "NO_TRANSCRIPT" | "INVALID_URL" | "GENERAL_ERROR";
}

export interface ApiError {
  success: false;
  error: string;
  errorType: "NO_TRANSCRIPT" | "INVALID_URL" | "GENERAL_ERROR";
}

export class TranscriptError extends Error {
  constructor(
    message: string,
    public readonly errorType: "NO_TRANSCRIPT" | "INVALID_URL" | "GENERAL_ERROR"
  ) {
    super(message);
    this.name = "TranscriptError";
  }
}
