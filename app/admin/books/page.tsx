"use client";
import {
    DocumentMagnifyingGlassIcon,
    NewspaperIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Books() {
    const [books, setBooks] = useState<GetBookResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
                );
                const books: GetBookResponse[] = await response.json();
                setBooks(books);
            } catch (error) {
                console.error("Error fetching books: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const deleteBook = async (id: number) => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`, {
                method: "DELETE",
            });
        } catch (error) {
            console.error("Error al borrar libro: ", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 px-44 pt-12">
            <div className="flex gap-8 items-center content-around">
                <h1 className="text-5xl font-bold">Admin panel</h1>
                <Link
                    href="books/create"
                    className="flex flex-col justify-center items-center"
                >
                    <NewspaperIcon className="w-10 h-10 mr-1" />CREAR NUEVO
                </Link>
            </div>

            {isLoading
                ? <h1 className="animate-pulse">Cargando</h1>
                : (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Título
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Autor
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Precio
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Género
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {books.map((book) => (
                                    <tr
                                        key={book.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {book.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {book.authorName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {book.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {book.genreName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {book.stock}
                                        </td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <Link
                                                href={`/admin/books/detail/${book.id}`}
                                                className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-1" />Ver
                                            </Link>
                                            <Link
                                                href={`/admin/books/editar/${book.id}`}
                                                className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                <PencilIcon className="w-5 h-5 mr-1" />Editar
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    deleteBook(book.id)}
                                                className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                <TrashIcon className="w-5 h-5 mr-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </div>
    );
}
