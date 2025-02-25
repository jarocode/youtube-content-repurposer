import { StateGraph, START, MemorySaver, END } from "@langchain/langgraph";

import { RepurposeContentState } from "./state";

import {
  aggregateRepurposedContentNode,
  createEmailNewsLetterNode,
  createLinkedinPostNode,
  createMediumPostNode,
  createTwitterPostNode,
  getTranscript,
} from "./nodes";

export const builder = new StateGraph(RepurposeContentState)
  .addNode("get_transcript", getTranscript)
  .addNode("create_linkedin_post", createLinkedinPostNode)
  .addNode("create_twitter_post", createTwitterPostNode)
  .addNode("create_medium_post", createMediumPostNode)
  .addNode("create_email_newsletter", createEmailNewsLetterNode)
  .addNode("aggregate_repurposed_content", aggregateRepurposedContentNode)
  .addEdge(START, "get_transcript")
  .addEdge("get_transcript", "create_linkedin_post")
  .addEdge("get_transcript", "create_twitter_post")
  .addEdge("get_transcript", "create_medium_post")
  .addEdge("get_transcript", "create_email_newsletter")
  .addEdge("create_linkedin_post", "aggregate_repurposed_content")
  .addEdge("create_twitter_post", "aggregate_repurposed_content")
  .addEdge("create_medium_post", "aggregate_repurposed_content")
  .addEdge("create_email_newsletter", "aggregate_repurposed_content")
  .addEdge("aggregate_repurposed_content", END);

// Set up memory
const memory = new MemorySaver();

// compile
export const repurposeContentGraph = builder.compile({
  checkpointer: memory,
});
