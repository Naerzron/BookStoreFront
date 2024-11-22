import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    const token = cookies().get("jwt");
    console.log(token);

    if (!token) {
        return NextResponse.json(
            { success: false, message: "No estás logueado" },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { success: true, message: "Exito" },
        { status: 200 }
    );
}
