import OpenAI from 'openai';
import { NextResponse } from 'next/server';
const openai = new OpenAI({
  apiKey: '', // defaults to process.env["OPENAI_API_KEY"]
});

async function main(todo) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Help me finish this todo' + todo }],
    model: 'gpt-3.5-turbo',
  });

  console.log(chatCompletion.choices);
  return chatCompletion.choices
}


export async function POST(req) {
const data = await req.json();
let choices = await main(data.todo);
return NextResponse.json({"text": choices[0].message.content})
}
