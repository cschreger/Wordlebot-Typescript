import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function GET(uid: string) {
    const user
}

export async function POST(req: Request) {
    const userData = await req.json();
    await prisma.user.create({
        data: userData
    })

    return NextResponse.json({message: 'User created!'}, {status: 200})
}