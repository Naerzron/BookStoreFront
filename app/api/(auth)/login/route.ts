import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { email, password } = await request.json();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            if (!token) {
                return NextResponse.json(
                    { success: false, message: "No se devolvio un token de login desde el backend." },
                    { status: 500 }
                );
            }

            const decoded: UserToken = jwtDecode(token);

            const res = NextResponse.json({ success: true, userRole: decoded.role }, { status: 200 });
            res.cookies.set("jwt", token, {
                maxAge: 60 * 60 * 12, 
                httpOnly: true, 
                secure: true, 
                path: "/"
            });

            return res;
        } else {
            return NextResponse.json({ success: false, message: "Error de autenticación. Verifica tus credenciales." }, { status: 403 });
        }
    } catch (error) {
        //console.error("Error en la autenticación:", error);
        return NextResponse.json(
            { success: false, message: "Ocurrió un error, intenta de nuevo." },
            { status: 500 }
        );
    }
}
