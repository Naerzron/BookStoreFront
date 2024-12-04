import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value;

    if (!token) {
        return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401 }
        );
    }

    try {
        const decoded: UserToken = jwtDecode(token);

        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
            return NextResponse.json(
                { message: "Token expired" },
                { status: 401 }
            );
        }
        return NextResponse.json({ role: decoded.role }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
}
