import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

let openaiStream: AsyncIterable<any> | null = null;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("API request received", req.method);

  if (req.method === "POST") {
    const { inputValue } = req.body;

    const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

    openaiStream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: inputValue }],
      stream: true,
    });

    res.status(200).json({ message: "Stream initiated" });
  } else if (req.method === "GET") {
    if (!openaiStream) {
      res.status(400).json({ error: "No stream available" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    for await (const chunk of openaiStream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }

    res.end();
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}