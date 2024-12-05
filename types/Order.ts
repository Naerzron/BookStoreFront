import { Book } from "./Book";

export type Order = {
    id: number;
    createdDate: string;
    status: string;
    totalAmount: string;
    details: OrderDetail[];
    user: User;
};

type OrderDetail = {
    id: number;
    book: Book;
    quantity: number;
};
