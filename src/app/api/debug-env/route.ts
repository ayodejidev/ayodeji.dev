import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasApiKey: !!process.env.HASHNODE_API_KEY,
    hasUsername: !!process.env.NEXT_PUBLIC_HASHNODE_USERNAME,
  });
} 