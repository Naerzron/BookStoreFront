"use client";

import { Author } from "@/types/Author";
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

type AuthorForm = {
    name: string;
    birthday: string;
};

export default function CreateAuthor() {
    const [formData, setFormData] = useState<AuthorForm>({
        name: "",
        birthday: "",
    });

    const [authors, setAuthors] = useState<Author[]>([]);
    const [mensaje, setMensaje] = useState("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const author: Author = {
                id: 0,
                name: formData.name,
                birthday: formData.birthday,
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authors`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(author),
                },
            );
            if (response.ok) {
                setFormData({
                    name: "",
                    birthday: "",
                });
                setMensaje("Autor creado correctamente");
                const responseAuthorsUpdated = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authors`,
                );
                const authorsUpdated: Author[] = await responseAuthorsUpdated
                    .json();
                setAuthors(authorsUpdated);
            } else {
                setMensaje("Error al crear el author");
            }
        } catch (error) {
            console.error("Error");
            setMensaje("Error al crear autor");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authors`,
                );
                const authors: Author[] = await response.json();
                setAuthors(authors);
            } catch (error) {
                console.error("Error fetching books: ", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    const deleteAuthor = async (id: Number) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authors/${id}`,
                {
                    method: "DELETE",
                },
            );

            if (response.ok) {
                const responseAuthorsUpdated = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/authors`,
                );
                const authorsUpdated: Author[] = await responseAuthorsUpdated
                    .json();

                setAuthors(authorsUpdated);
            }
        } catch (error) {
            console.error("Error al borrar el género: ", error);
        }
    };

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg dark:text-gray-400 flex flex-col items-center">
            {/* Título del formulario */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">
                Crear Nuevo Autor
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                {/* Campo Nombre */}
                <div className="mb-4 w-full">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        Nombre del autor
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Nombre del autor"
                        required
                    />
                </div>

                {/* Campo Fecha de Nacimiento */}
                <div className="mb-4 w-full">
                    <label
                        htmlFor="genreId"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                        Fecha de nacimiento
                    </label>
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Descripción del género"
                        required
                    />
                </div>

                {/* Botón de enviar */}
                <div className="text-center w-full">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                    >
                        Crear Autor
                    </button>
                </div>
            </form>

            {/* Mensaje de confirmación */}
            <p className="mt-4 text-center">{mensaje}</p>
            <div className="flex flex-col justify-center items-center gap-8 px-44 pt-12">
                <div className="flex gap-8 items-center content-around">
                    <h1 className="text-5xl font-bold">Panel Autores</h1>
                </div>

                {isLoading
                    ? <h1 className="animate-pulse">Cargando</h1>
                    : (
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Fecha Nacimiento
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {authors.map((author) => (
                                        <tr
                                            key={author.id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {author.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {author.birthday}
                                            </td>
                                            <td className="px-6 py-4 flex space-x-4">
                                                <button
                                                    onClick={() =>
                                                        deleteAuthor(author.id)}
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
        </div>
    );
}
