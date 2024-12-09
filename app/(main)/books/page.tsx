"use client";
import Image from "next/image";
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
                //console.error("Error fetching books: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center gap-8 px-12 pt-32 pb-12">
            {isLoading
                ? <h1 className="animate-pulse">Cargando</h1>
                : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800"
                            >
                                <div className="w-full overflow-hidden">
                                    <Image
                                        src={`/resources/images/${
                                            book.image == ""
                                                ? "default.jpg"
                                                : book.image
                                        }`}
                                        alt={`Portada de ${book.title}`}
                                        className="w-full h-full object-contain"
                                        width={200}
                                        height={300}
                                        priority={false}
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                                            {book.title}
                                        </h2>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                                Precio: ${book.price}
                                            </p>
                                            <Link
                                                className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                                href={`books/detail/${book.id}`}
                                            >
                                                Comprar
                                            </Link>
                                        </div>
                                    </div>
                                    {
                                        /* <div className="mt-4 flex space-x-4">
                                    <Link
                                        href={`/admin/books/detail/${book.id}`}
                                        className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                                    >
                                        Ver detalles
                                    </Link>
                                </div> */
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}
