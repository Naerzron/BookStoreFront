import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieToken = req.cookies.get("jwt");
        const token = cookieToken?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "User not logged" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/all`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        return NextResponse.json(
            { success: true, users },
            { status: 200 }
        );
    } catch (error) {
        //console.error("Error fetching users:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
