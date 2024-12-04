import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { currentPassword, newPassword } = await request.json();

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ currentPassword, newPassword }),
            credentials: "include",
        });

        return NextResponse.json({ success: true, message: "Exito" }, { status: 200 });
        
    }catch{
        return NextResponse.json({ success: false, message: "Error de autenticación. Verifica tus credenciales." }, { status: 403 });
    }
}
