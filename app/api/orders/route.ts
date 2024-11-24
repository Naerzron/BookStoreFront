import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        // Parsear los datos recibidos del cliente
        const cartItems: CartItem[] = await req.json();

        // Aquí podrías agregar lógica para procesar los `cartItems`, como validaciones o formateo
        console.log("Cart items received:", cartItems);

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

        // Realiza la solicitud POST al endpoint
        const response = await fetch("http://localhost:5141/api/Orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // Incluye el token si tu API lo requiere
            },
            body: JSON.stringify(orderRequest),
        });

        if (!response.ok) {
            throw new Error("Failed to create the order");
        }

        const data = await response.json();
        console.log("Order created successfully:", data);
        if (!response.ok) {
            return NextResponse.json(
                { message: "Error fetching book" },
                { status: response.status }
            );
        }

        // Responder con éxito
        return NextResponse.json(
            { success: true, message: "Order processed successfully" },
            { status: 200 }
        );
    } catch (error) {
        // Responder con un error si ocurre algo inesperado
        return NextResponse.json(
            { success: false, message: "Failed to process the order" },
            { status: 500 }
        );
    }
}
