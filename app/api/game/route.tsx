import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const gameData = await req.json();
    await prisma.game.create({
        data: gameData
    })

    return NextResponse.json({message: 'Game saved.'}, {status: 200})
}