import { Author } from "./Author";
import { Genre } from "./Genre";

export type Book = {
    id: number;
    title: string;
    publishedDate: string;
    stock: number;
    price: number;
    synopsis: string;
    isbn: string;
    author?: Author;
    genre?: Genre;
    image: string;
};
