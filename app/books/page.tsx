"use client"
import { Book } from "@/types/Book";
import { DocumentMagnifyingGlassIcon, NewspaperIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Books() {

    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    // Los hooks en react son funciones que te permiten ejecutar
    // codigo personalizado dentro del ciclo de vida de los copmonentes
    // de react.
    // useEffect ejecuta la funcion flecha cada vez que se modifique
    // algo de la lista de dependencias (el ultimo parametro)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5141/api/books');
                const data: Book[] = await response.json();
                setBooks(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();
    }, [books])

    const deleteBook = async (id: Number) => {
        try {
            await fetch(`http://localhost:5141/api/books/${id}`, {
                method: 'DELETE'
            });
        } catch (error) {
            console.error('Error al borrar libro: ', error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-8 px-44 pt-12">
            <div className="flex gap-8 items-center content-around">
                <h1 className="text-5xl font-bold">Admin panel</h1>
                <Link href="/books/crear" className="flex flex-col justify-center items-center"><NewspaperIcon className="w-10 h-10 mr-1" />CREAR NUEVO</Link>
            </div>

            {isLoading ? (
                <h1 className="animate-pulse">Cargando</h1>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                                    Editorial
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    precio
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {books.map((book) => (
                                <tr key={book.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {book.titulo}
                                    </th>
                                    <td className="px-6 py-4">
                                        {book.autor}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.editorial}
                                    </td>
                                    <td className="px-6 py-4">
                                        {book.precio}
                                    </td>
                                    <td className="px-6 py-4 flex space-x-4">
                                        <Link href={`/books/detail/${book.id}`} className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-1" />Ver
                                        </Link>
                                        <Link href={`/books/editar/${book.id}`} className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <PencilIcon className="w-5 h-5 mr-1" />Editar
                                        </Link>
                                        <button onClick={() => deleteBook(book.id)} className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
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