import { Annotation } from "@langchain/langgraph";

export interface RepurposedContents {
  linkedin_post: string;
  x_post: string;
  medium_post: string;
  email_newsletter: string;
}

export const RepurposeContentState = Annotation.Root({
  videoId: Annotation<string>,
  youtube_transcript: Annotation<string>,
  linkedin_post: Annotation<string>,
  x_post: Annotation<string>,
  medium_post: Annotation<string>,
  email_newsletter: Annotation<string>,
  repurposed_contents: Annotation<RepurposedContents>,
});
