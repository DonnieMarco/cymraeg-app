import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  const { answer, verbNoun, tense, register, person, correct } = await req.json();

  const message = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 150,
    messages: [
      {
        role: 'user',
        content: `Give a short natural Welsh sentence using this conjugation of ${verbNoun} (${tense}, ${register}, person: ${person}): "${answer}"
The learner was ${correct ? 'correct' : 'incorrect'}.
Reply with ONLY a JSON object, no other text:
{"exampleSentence": "Welsh sentence here (English translation in brackets)"}`,
      },
    ],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';
  try {
    const result = JSON.parse(text);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ exampleSentence: '' });
  }
}
