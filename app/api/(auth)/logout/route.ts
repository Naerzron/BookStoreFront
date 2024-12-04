import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        const res = NextResponse.json(
            { success: true, message: "Sesión cerrada" },
            { status: 200 }
        );
        res.cookies.delete("jwt");

        return res;
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Ocurrió un error al cerrar sesión, intente de nuevo.",
            },
            { status: 500 }
        );
    }
}
