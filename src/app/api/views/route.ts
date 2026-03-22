import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(request: NextRequest) {
  try {
    const hasCookie = request.cookies.get("viewed_home");

    let count: number;
    if (hasCookie) {
      const current = await redis.get<number>("views:home");
      count = typeof current === "number" ? current : 0;
    } else {
      count = await redis.incr("views:home");
    }

    const response = NextResponse.json({ count });
    if (!hasCookie) {
      response.cookies.set("viewed_home", "1", {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
    }
    return response;
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
