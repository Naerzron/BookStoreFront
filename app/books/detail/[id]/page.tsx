"use client"
import { Book } from "@/types/Book";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function BookDetail() {

    const [book, setBook] = useState<Book>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams(); // Aquí accedemos al parámetro "id" de la URL
    const id = params.id; // Aquí accedemos al parámetro "id" de la URL

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5141/api/books/${id}`);
                const book: Book = await response.json();
                setBook(book);
            } catch (error) {
                console.error('Error fetching book: ', error);
            }
        };

        fetchBook();
    }, [])
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-6">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6">
                {/* Título del libro */}
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-300 mb-4">{book?.title}</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Imagen del libro */}
                    <div className="md:col-span-1">
                        <img
                            src="https://via.placeholder.com/250x350"
                            alt={`Portada del libro ${book?.title}`}
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </div>

                    {/* Información del libro */}
                    <div className="md:col-span-2 space-y-4">
                        {/* Sinopsis */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">Sinopsis</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">{book?.synopsis}</p>
                        </div>

                        {/* Autor */}
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">Autor:</span>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">{book?.authorId}</span>
                        </div>

                        {/* Genero */}
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">Genero:</span>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">{book?.genreId}</span>
                        </div>

                        {/* ISBN */}
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">ISBN:</span>
                            <span className="ml-2 text-gray-600 dark:text-gray-400">{book?.isbn}</span>
                        </div>

                        {/* Precio */}
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">Precio:</span>
                            <span className="ml-2 text-green-600 font-bold dark:text-green-400">€{book?.price}</span>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center">
                            <span className="text-gray-700 dark:text-gray-300 font-semibold">Stock:</span>
                            <span className="ml-2 text-green-600 font-bold dark:text-green-400">€{book?.stock}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}