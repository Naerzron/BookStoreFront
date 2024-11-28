type Book = {
    id: number;
    title: string;
    publishedDate: string; // Utilizamos string en lugar de DateOnly para manejarlo en TypeScript
    stock: number;
    price: number;
    synopsis: string;
    isbn: string;
    authorId?: number;
    genreId?: number;
    image: string;
}