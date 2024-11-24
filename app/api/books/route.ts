import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        // Obtener parámetros de la URL
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get("id"); // Extraer el ID del libro de los parámetros

        if (!bookId) {
            return NextResponse.json(
                { message: "Missing book ID" },
                { status: 400 }
            );
        }

        // Llamada a la API para obtener información del libro
        const response = await fetch(`http://localhost:5141/api/books/${bookId}`);
        if (!response.ok) {
            return NextResponse.json(
                { message: "Error fetching book" },
                { status: response.status }
            );
        }

        const book: GetBookResponse = await response.json();

        // Devolver la respuesta en formato JSON
        return NextResponse.json(book, { status: 200 });
    } catch (error) {
        console.error("Error fetching book: ", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}