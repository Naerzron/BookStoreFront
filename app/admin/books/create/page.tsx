"use client";
import React, { useEffect, useState } from "react";
import { Genre } from "@/types/Genre";
import { Author } from "@/types/Author";
import { CreateBookRequest } from "@/types/CreateBookRequest";

type createBookForm = {
    title: string;
    publishedDate: string;
    stock: string;
    price: string;
    synopsis: string;
    isbn: string;
    authorId: string;
    genreId: string;
    image: string;
};

export default function CreateBook() {
    const [formData, setFormData] = useState<createBookForm>({
        title: "",
        publishedDate: "",
        stock: "",
        price: "",
        synopsis: "",
        isbn: "",
        authorId: "",
        genreId: "",
        image: "",
    });

    const [genres, setGenres] = useState<Genre[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const bookRequest: CreateBookRequest = {
                title: formData.title,
                publishedDate: formData.publishedDate,
                stock: Number(formData.stock),
                price: Number(formData.price),
                synopsis: formData.synopsis,
                isbn: formData.isbn,
                authorId: Number(formData.authorId),
                genreId: Number(formData.genreId),
                image: formData.image,
            };
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/books`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookRequest),
                }
            );
            if (response.ok) {
                setFormData({
                    title: "",
                    publishedDate: "",
                    stock: "",
                    price: "",
                    synopsis: "",
                    isbn: "",
                    authorId: "",
                    genreId: "",
                    image: "",
                });
                setMensaje("Libro creado correctamente");
            } else {
                setMensaje("Error al crear libro");
            }
        } catch (error) {
            setMensaje("Error al crear libro: " + error);
        }
    };

    useEffect(() => {
        async function fetchGenres() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/genres`
            );
            const data = await response.json();
            setGenres(data);
        }
        fetchGenres();
    }, []);

    useEffect(() => {
        async function fetchAuthors() {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/authors`
            );
            const data = await response.json();
            setAuthors(data);
        }
        fetchAuthors();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="py-12 min-h-[92vh]">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 px-8 md:p-8 md:shadow-lg rounded-lg dark:text-gray-400">
                {/* Título del formulario */}
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">
                    Crear Nuevo Libro
                </h2>

                <form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-8">
                    {/* Campo Título */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Título del libro
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Título del libro"
                            required
                        />
                    </div>

                    {/* Campo publishedDate */}
                    <div className="mb-4">
                        <label
                            htmlFor="publishedDate"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Fecha de publicación
                        </label>
                        <input
                            type="date"
                            name="publishedDate"
                            value={formData.publishedDate}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Fecha de publicación"
                            required
                        />
                    </div>

                    {/* Campo Stock */}
                    <div className="mb-4">
                        <label
                            htmlFor="titulo"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Stock"
                            required
                        />
                    </div>

                    {/* Campo Price */}
                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Precio
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Precio del libro"
                            required
                        />
                    </div>

                    {/* Campo Synopsis */}
                    <div className="mb-4">
                        <label
                            htmlFor="synopsis"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Sinopsis del libro
                        </label>
                        <input
                            type="text"
                            name="synopsis"
                            value={formData.synopsis}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Sinopsis del libro"
                            required
                        />
                    </div>

                    {/* Campo ISBN */}
                    <div className="mb-4">
                        <label
                            htmlFor="isbn"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            ISBN
                        </label>
                        <input
                            type="text"
                            name="isbn"
                            value={formData.isbn}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="ISBN del libro"
                            required
                        />
                    </div>

                    {/* Campo Author */}
                    <div className="mb-4">
                        <label
                            htmlFor="authorId"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Autor del libro
                        </label>
                        <select
                            name="authorId"
                            value={formData.authorId}
                            onChange={handleSelectChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            required
                        >
                            <option value="" disabled>
                                Selecciona un Autor
                            </option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo GenreId */}
                    <div className="mb-4">
                        <label
                            htmlFor="genreId"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Género del libro
                        </label>
                        <select
                            name="genreId"
                            value={formData.genreId}
                            onChange={handleSelectChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            required
                        >
                            <option value="" disabled>
                                Selecciona un género
                            </option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Campo Image */}
                    <div className="mb-4">
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                        >
                            Portada
                        </label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                            placeholder="Portada del libro"
                            required
                        />
                    </div>

                    {/* Botón de enviar */}
                    <div className="text-center md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 dark:hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                        >
                            Crear Libro
                        </button>
                    </div>
                </form>

                {/* Mensaje de confirmación */}
                <p className="mt-4 text-center">{mensaje}</p>
            </div>
        </section>
    );
}
