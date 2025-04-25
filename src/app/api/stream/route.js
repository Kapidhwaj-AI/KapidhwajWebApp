// app/api/stream/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch('https://media.kapidhwaj.ai:9889/225/', {
    headers: {
      // Add headers if required by the stream server
    },
  });

  const readableStream = res.body;

  return new NextResponse(readableStream, {
    headers: {
      'Content-Type': res.headers.get('content-type') || 'video/mp4',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
