import { PromptTemplate } from "@langchain/core/prompts";
import { TranscriptService } from "./services";
import { LLM } from "@/app/api/llms";
import {
  createEmailNewsLetterPrompt,
  createLinkedPostPrompt,
  createMediumPostPrompt,
  createTwitterPostPrompt,
} from "./prompt";
import { RepurposeContentState } from "./state";
import { TranscriptResponse } from "@danielxceron/youtube-transcript";

const model = LLM.chatOpenAI;

export const getTranscript = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Get transcript node--");

  const { videoId } = state;
  const transcriptData = await TranscriptService.getTranscript(videoId);
  const formattedTranscript = transcriptData
    ?.map((transcript: TranscriptResponse) => transcript.text)
    .join(", ");

  return {
    youtube_transcript: formattedTranscript,
  };
};

export const createLinkedinPostNode = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Create linkedin post node--");

  const { youtube_transcript } = state;

  const prompt = PromptTemplate.fromTemplate(createLinkedPostPrompt);
  const chain = prompt.pipe(model);
  const result = await chain.invoke({ transcript: youtube_transcript });
  console.log("--LINKEDIN POST--:");
  console.log(result.content);
  const linkedin_post = result.content;
  return {
    linkedin_post,
  };
};

export const createTwitterPostNode = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Create twitter (x) post node--");

  const { youtube_transcript } = state;

  const prompt = PromptTemplate.fromTemplate(createTwitterPostPrompt);
  const chain = prompt.pipe(model);
  const result = await chain.invoke({ transcript: youtube_transcript });
  console.log(" twitter (x) post:", result.content);
  const x_post = result.content;
  return {
    x_post,
  };
};

export const createMediumPostNode = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Create medium post node--");

  const { youtube_transcript } = state;

  const prompt = PromptTemplate.fromTemplate(createMediumPostPrompt);
  const chain = prompt.pipe(model);
  const result = await chain.invoke({ transcript: youtube_transcript });
  console.log(" medium post:", result.content);
  const medium_post = result.content;
  return {
    medium_post,
  };
};

export const createEmailNewsLetterNode = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Create email newsletter node--");

  const { youtube_transcript } = state;

  const prompt = PromptTemplate.fromTemplate(createEmailNewsLetterPrompt);
  const chain = prompt.pipe(model);
  const result = await chain.invoke({ transcript: youtube_transcript });
  console.log("--EMAIL NEWSLETTER--");
  console.log(result.content);
  const email_newsletter = result.content;
  return {
    email_newsletter,
  };
};

export const aggregateRepurposedContentNode = async (
  state: typeof RepurposeContentState.State
) => {
  console.log("--Aggregate repurposed content node--");

  const { linkedin_post, x_post, medium_post, email_newsletter } = state;

  const repurposed_contents = [
    {
      id: "1",
      platform: "LinkedIn",
      title: "LinkedIn Post",
      content: linkedin_post,
    },
    { id: "2", platform: "X", title: "X Thread", content: x_post },
    {
      id: "3",
      platform: "Medium",
      title: "Medium Article",
      content: medium_post,
    },

    {
      id: "4",
      platform: "Email",
      title: "Newsletter",
      content: email_newsletter,
    },
  ];

  return {
    repurposed_contents,
  };
};
