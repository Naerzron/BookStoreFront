"use client"
import React, { useState } from 'react'
import { Book } from "@/types/Book";
export default function CreateBook() {

    // Estado para el formulario
    const [formData, setFormData] = useState({
        titulo: '',
        sinopsis: '',
        autor: '',
        editorial: '',
        precio: '',
        isbn: '',

    });
    const [mensaje, setMensaje] = useState("");

    // Manejar el cambio en los campos
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //Envio de datos
        try {
            const book: Book = {
                id: 0,
                titulo: formData.titulo,
                sinopsis: formData.sinopsis,
                autor: formData.autor,
                editorial: formData.editorial,
                precio: Number(formData.precio),
                isbn: formData.isbn,
            }
            const response = await fetch('http://localhost:5141/api/books',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(book)
                })
            if (response.ok) {
                setFormData({
                    titulo: '',
                    sinopsis: '',
                    autor: '',
                    editorial: '',
                    precio: '',
                    isbn: ''
                })
                setMensaje("Libro creado correctamente");
            }
            else {
                setMensaje("Error al crear libro");
            }
            console.log(response);
        } catch (error) {
            console.error("Error");
            setMensaje("Error al crear libro");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg dark:text-gray-400">
            {/* Título del formulario */}
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">
                Crear Nuevo Libro
            </h2>
    
            <form onSubmit={handleSubmit}>
                {/* Campo Título */}
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Título del libro
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Título del libro"
                        required
                    />
                </div>
    
                {/* Campo Sinopsis */}
                <div className="mb-4">
                    <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Sinopsis del libro
                    </label>
                    <input
                        type="text"
                        name="sinopsis"
                        value={formData.sinopsis}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Sinopsis del libro"
                        required
                    />
                </div>
    
                {/* Campo Autor */}
                <div className="mb-4">
                    <label htmlFor="autor" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Autor del libro
                    </label>
                    <input
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Autor del libro"
                        required
                    />
                </div>
    
                {/* Campo Editorial */}
                <div className="mb-4">
                    <label htmlFor="editorial" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Editorial
                    </label>
                    <input
                        type="text"
                        name="editorial"
                        value={formData.editorial}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Editorial del libro"
                        required
                    />
                </div>
    
                {/* Campo Precio */}
                <div className="mb-4">
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        Precio
                    </label>
                    <input
                        type="text"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="Precio del libro"
                        required
                    />
                </div>
    
                {/* Campo ISBN */}
                <div className="mb-4">
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                        ISBN
                    </label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-300"
                        placeholder="ISBN del libro"
                        required
                    />
                </div>
    
                {/* Botón de enviar */}
                <div className="text-center">
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
    );
}    