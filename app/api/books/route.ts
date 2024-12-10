import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get("id");

        if (!bookId) {
            return NextResponse.json(
                { message: "Missing book ID" },
                { status: 400 }
            );
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`
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
