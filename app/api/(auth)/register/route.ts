import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const registerData: RegisterData = await request.json();


        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        if (response.ok) {
            
                return NextResponse.json(
                    { success: true, message: "Exito en el registro." },
                    { status: 200 }
                );
        } else {
            return NextResponse.json(
                { success: false, message: "Error de registro. Verifica los datos proporcionados." },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        return NextResponse.json(
            { success: false, message: "Ocurrió un error, intenta de nuevo." },
            { status: 500 }
        );
    }
}
