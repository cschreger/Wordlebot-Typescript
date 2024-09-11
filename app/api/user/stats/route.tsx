import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET() {
    const user = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      select: {
        email: true,
        name: true,
        games: true
      }
    })

    return NextResponse.json(user);
}

