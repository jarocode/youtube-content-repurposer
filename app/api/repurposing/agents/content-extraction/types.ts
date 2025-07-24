export interface TranscriptResponse {
  text: string;
  duration: number;
  offset: number;
  lang: string;
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
