import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { currentPassword, newPassword } = await request.json();

        const response = await fetch("http://localhost:5141/api/auth/change-password", {
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
