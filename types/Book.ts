import { Author } from "./Author";
import { Genre } from "./Genre";

export type Book = {
    id: number;
    title: string;
    publishedDate: string; // Utilizamos string en lugar de DateOnly para manejarlo en TypeScript
    stock: number;
    price: number;
    synopsis: string;
    isbn: string;
    author?: Author;
    genre?: Genre;
    image: string;
}