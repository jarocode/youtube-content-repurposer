import { ChatOpenAI } from "@langchain/openai";

const chatOpenAI = new ChatOpenAI({
  temperature: 0.7,
  modelName: "gpt-4o",
});

export const LLM = {
  chatOpenAI,
};
