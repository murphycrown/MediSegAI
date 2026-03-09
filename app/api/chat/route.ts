import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, SessionData } from "@/lib/session";
import { GoogleGenAI } from "@google/genai";
import { ChatGoogle } from "@langchain/google";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
type SessionUser = {
  id: string;
  email: string;
  name?: string;
};
export const dynamic = "force-dynamic";
export async function POST(req: NextRequest) {
  try {
    // 🔐 Get session
   const session = await getIronSession<SessionData>(req, NextResponse.next(), sessionOptions);


    // ❌ Not logged in
    if (!session.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 📥 Read request body
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { message: "Invalid message" },
        { status: 400 }
      );
    }





//sending the data and retreiving response




// const llm = new ChatGoogleGenerativeAI({
//      model: "gemini-3-flash-preview",
//       apiKey: process.env.GEMINI_API_KEY,
//       streaming: true,
//     });

//     const parser = new BytesOutputParser();
//     console.log("sened")
//     const stream = await llm.pipe(parser).stream(message);

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain; charset=utf-8" },
//     });
const llm = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      apiKey: process.env.GEMINI_API_KEY,
      temperature: 0.7,
      maxRetries: 2,
    });

    // 1. Use BytesOutputParser to automatically convert to byte stream
    const stream = await llm.pipe(new BytesOutputParser()).stream(message);

    // 2. Return the stream directly as a Response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });






//const ai = new GoogleGenAI({});

    // 🤖 Call Gemini
    // const geminiRes = await fetch(
    //  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       contents: [
    //         {
    //           parts: [{ text: message }],
    //         },
    //       ],
    //     }),
    //   }
    // );
//   const response = await ai.models.generateContent({
//     model: "gemini-3-flash-preview",
//     contents: message,
//   });
//  // console.log(response.text);

//     if (!response) {
     
//       return NextResponse.json(
//         { message: "AI service error" },
//         { status: 500 }
//       );
//     }

//     const data = await geminiRes.json();

//     const reply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ??
//       "Sorry, I couldn't generate a response.";

   //  return NextResponse.json( response.text );
} catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
   }
 }
