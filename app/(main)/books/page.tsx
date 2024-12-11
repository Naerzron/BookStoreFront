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
                console.error("Error fetching books: ", error);
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
                    <div className="max-w-lg lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {books.map((book) => (
                            <div
                            key={book.id}
                            className="flex flex-col"
                        >
                            <div className="w-full flex items-center justify-center">
                                <Image
                                    src={`/resources/images/${
                                        book.image === "" ? "default.jpg" : book.image
                                    }`}
                                    alt={`Portada de ${book.title}`}
                                    className="w-full h-full max-h-96 object-cover rounded-t-lg"
                                    width={200}
                                    height={300}
                                    priority={false}
                                />
                            </div>
                            <div className="w-full bg-gray-50 rounded-b-lg shadow-md p-4 h-full">
                                <div className="w-full h-full flex flex-col items-center space-y-2">
                                    <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center space-x-4">
                                        <p className="font-medium dark:text-gray-400 text-center">
                                            {book.price} €
                                        </p>
                                        <Link
                                            className="px-3 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                                            href={`books/detail/${book.id}`}
                                        >
                                            Comprar
                                        </Link>
                                    </div>
                                    <div className="flex-1 flex items-center">
                                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                                            {book.title}
                                        </h2>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        
                        ))}
                    </div>
                )}
        </div>
    );
}
