import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { currentPassword, newPassword } = await request.json();

        const cookieToken = request.cookies.get("jwt");
        const token = cookieToken?.value;

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        return NextResponse.json({ success: true, message: "Exito" }, { status: 200 });
        
    }catch{
        return NextResponse.json({ success: false, message: "Error de autenticación. Verifica tus credenciales." }, { status: 403 });
    }
}
