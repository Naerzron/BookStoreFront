import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
        const userId = params.id;
        const cookieToken = request.cookies.get("jwt");
        const token = cookieToken?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "User not logged" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch orders");
        }

        const orders = await response.json();

        return NextResponse.json(
            { success: true, orders },
            { status: 200 }
        );
    } catch (error) {
        //console.error("Error fetching orders:", error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    try {
        const orderId = params.id;
        const cookieToken = request.cookies.get("jwt");
        const token = cookieToken?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "User not logged" },
                { status: 401 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, 
            },
        });
        if (!response.ok) {
            throw new Error();
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to delete order", error: error },
            { status: 500 }
        );
    }
}