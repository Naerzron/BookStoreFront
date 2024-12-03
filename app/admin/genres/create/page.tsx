"use client"
import React, { useEffect, useState } from 'react'
import { Genre } from '@/types/Genre';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '@heroicons/react/16/solid';

interface FormGenreData {
    name: string,
    description: string
}

export default function CreateGenre() {

    // Estado para el formulario:
    const [formData, setFormData] = useState<FormGenreData>({
        name: "",
        description: ""
    });
    
    //Estados del componente
    const [mensaje, setMensaje] = useState<string>("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //Envio de datos
        try {
            const genre: Genre = {
                id: 0,
                name: formData.name,
                description: formData.description,
            }
            const response = await fetch('http://localhost:5141/api/genres',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(genre)
                })
            if (response.ok) {
                setFormData({
                    name: '',
                    description: '',
                })
                setMensaje("Género creado correctamente");
            }
            else {
                setMensaje("Error al crear género");
            }
        } catch (error) {
            console.error("Error");
            setMensaje("Error al crear género");
        }
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`http://localhost:5141/api/genres`);
                const data: Genre[] = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres: ', error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchGenres();
    }, []);

    // Manejar el cambio en los campos
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //Borrar género
    const deleteGenre = async (id: Number) => {
        try{
            const response = await fetch(`http://localhost:5141/api/genres/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                const updatedGenres: Genre[] = genres.filter((genre: Genre) => {
                    return genre.id !== id;
                });
                setGenres(updatedGenres);
            }
        } catch (error) {
            console.error('Error al borrar el género: ', error);
        }
    }

    return (
        <div className="w-full bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg dark:text-gray-400 flex flex-col items-center">
            {/* Título del formulario */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">
                Crear Nuevo Género
            </h2>

            <form onSubmit={handleSubmit} className="w-full max-w-xl">
                {/* Campo Título */}
                <div className="mb-4 w-full">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Nombre del género
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Nombre del género"
                        required
                    />
                </div>

                {/* Campo Descripción */}
                <div className="mb-4 w-full">
                    <label htmlFor="genreId" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Descripción del género
                    </label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
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
                        Crear Género
                    </button>
                </div>
            </form>

            {/* Mensaje de confirmación */}
            <p className="mt-4 text-center">{mensaje}</p>


            <div className="flex flex-col justify-center items-center gap-8 px-44 pt-12">
                <div className="flex gap-8 items-center content-around">
                    <h1 className="text-5xl font-bold">Panel Géneros</h1>
                </div>

                {isLoading ? (
                    <h1 className="animate-pulse">Cargando</h1>
                ) : (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Nombre
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Descripcion
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {genres.map((genre) => (
                                    <tr key={genre.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {genre.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {genre.description}
                                        </td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <button onClick={() => deleteGenre(genre.id)} className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
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