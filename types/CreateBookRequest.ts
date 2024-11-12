export interface CreateBookRequest {
    title: string;
    publishedDate: string;
    stock: number;
    price: number;
    synopsis: string;
    isbn: string;
    authorId?: number;
    genreId?: number;
    image: string;
}