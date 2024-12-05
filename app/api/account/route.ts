import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const cookieToken = request.cookies.get("jwt");
        const token = cookieToken?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "User not logged" },
                { status: 401 }
            );
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/account`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { message: "Error fetching book" },
                { status: response.status }
            );
        }

        const book: GetBookResponse = await response.json();

        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        console.error("Error fetching book: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const profileData = await req.json();

        const cookieToken = req.cookies.get("jwt");
        const token = cookieToken?.value;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });
        
        if (!response.ok) {
            throw new Error("Failed to update profile");
        }
        
        if (!response.ok) {
            return NextResponse.json(
                { message: "Error updating profile" },
                { status: response.status }
            );
        }
        
        return NextResponse.json(
            { success: true, message: "Profile updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to update profile", error },
            { status: 500 }
        );
    }
}