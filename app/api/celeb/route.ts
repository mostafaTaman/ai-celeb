import { NextResponse } from "next/server";
import { checkUserSubscription } from "@/lib/checkUserSubscription";
import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prisma";

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const user = await currentUser();
        const { src, name, description, instructions, seed, categoryId } = body;

        if (!user || !user.id || !user.username) return new NextResponse("Unauthorized", { status: 401 });
        if (!src || !name || !description || !instructions || !seed || !categoryId) return new NextResponse("Missing required fields", { status: 400 });

        const isProMember = await checkUserSubscription();
        if (!isProMember) return new NextResponse("Pro subscription required", { status: 403 });


        const celeb = await prismadb.celeb.create({
            data: {
                categoryId,
                userId: user.id,
                userName: user.username,
                src,
                name,
                description,
                instructions,
                seed,
            }
        });

        return NextResponse.json(celeb);
    } catch {
        return new NextResponse("Internal Error", { status: 500 });
    }
};