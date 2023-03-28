import { Request, Response } from 'express';

// import openai chat completion
import { OpenAIApi, Configuration } from 'openai';
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai';

// get api key from dotenv
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function(req : Request, res : Response) {
  
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: 'You are a helpful senior programmer specialised in web development with Firebase',
    },
    ...req.body.messages,
  ];

  const completion = await openai.createChatCompletion({
    model: "gpt-4",
    messages,

  });
  res.status(200).json({ result: completion.data.choices[0].message })

}