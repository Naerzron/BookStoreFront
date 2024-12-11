import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const cartItems: CartItem[] = await req.json();

        if (!cartItems) {
            return NextResponse.json(
                { success: false, message: "No cart items found" },
                { status: 400 }
            );
        }

        const orderRequest = {
            items: cartItems.map((item) => ({
                bookId: item.id,
                quantity: item.quantity,
            })),
        };

        const cookieToken = req.cookies.get("jwt");
        const token = cookieToken?.value;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(orderRequest),
        });

        if (response.status === 400) {
            const errorData = await response.json();
            return NextResponse.json(
                { success: false, message: errorData.message || "No hay stock suficiente" },
                { status: 400 }
            );
        }

        if (!response.ok) {
            return NextResponse.json(
                { message: "Error fetching book" },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { success: true, message: "Order processed successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to process the order", error },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const cookieToken = req.cookies.get("jwt");
        const token = cookieToken?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, message: "User not logged" },
                { status: 400 }
            );
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch the orders");
        }

        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json(
                { message: "Error fetching orders" },
                { status: response.status }
            );
        }

        return NextResponse.json(
            { success: true, message: "Orders fetched successfully", orders: data },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Failed to fetch the orders", error },
            { status: 500 }
        );
    }

}
