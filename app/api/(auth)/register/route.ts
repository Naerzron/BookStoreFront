import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const registerData: RegisterData = await request.json();

        console.log(registerData);

        const response = await fetch("http://localhost:5141/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        const data = await response.json();

        if (response.ok) {
            
                return NextResponse.json(
                    { success: true, message: "Exito en el registro." },
                    { status: 200 }
                );
        } else {
            console.log(data);
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