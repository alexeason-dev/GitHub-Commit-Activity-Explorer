import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: "", //Enter API KEY HERE
  dangerouslyAllowBrowser: true,
});

async function getGitHubComments(name) {

  const comments_url = `https://api.github.com/repos/${name}/issues/comments`;
  
  try {
    const response = await axios.get(comments_url);
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub comments:", error);
    throw error;
  }
}

async function sentimentAnalysis(name) {
  const comments = await getGitHubComments(name);

  let prompt = `Perform sentiment analysis on comments provided below to determine the sentiment. Classify it into three categories positive, negative, or neutral.
  Instructions:

  1. Output should only be one emoji that covers the sentiments of all comments; there should not be any text in the output. Enforce this instruction.

  These are the related emojis
    - Positive Sentiment: 😃
    - Negative Sentiment: 😔
    - Neutral Sentiment: 😑

  Comments:
  `;

  for (let i = 0; i < Math.min(5, comments.length); i++) {
    prompt += `- ${comments[i].body} \n`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content;
    return content;
  } catch (error) {
    console.error("Error processing message to ChatGPT:", error);
    throw error;
  }
}

export default sentimentAnalysis

