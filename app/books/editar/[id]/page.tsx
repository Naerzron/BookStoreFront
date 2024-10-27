"use client";

import React, { useEffect, useState } from 'react'
import { Book } from "@/types/Book";
import { useParams } from 'next/navigation';

export default function EditBook() {

    // Estado para el formulario
    const [formData, setFormData] = useState({
        titulo: '',
        sinopsis: '',
        autor: '',
        editorial: '',
        precio: '',
        isbn: ''
    });
    const [mensaje, setMensaje] = useState("");

    const params = useParams(); // Aquí accedemos al parámetro "id" de la URL
    const id = params.id; // Aquí accedemos al parámetro "id" de la URL
    
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`http://localhost:5141/api/books/${id}`);
                const book: Book = await response.json();
                setFormData({
                    titulo: book.titulo,
                    sinopsis: book.sinopsis,
                    autor: book.autor,
                    editorial: book.editorial,
                    precio: `${book.precio}`,
                    isbn: book.isbn
                })
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        fetchBooks();
    }, [])

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
                id: Number(id),
                titulo: formData.titulo,
                sinopsis: formData.sinopsis,
                autor: formData.autor,
                editorial: formData.editorial,
                precio: Number(formData.precio),
                isbn: formData.isbn
            }
            const response = await fetch(`http://localhost:5141/api/books/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book)
            })
            if(response.ok)
            {
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
            else 
            {
              setMensaje("Error al crear libro");   
            }
            console.log(response);
        } catch (error) {
            console.error("Error");
            setMensaje("Error al crear libro");  
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg dark:text-gray-400">
            <h2 className="text-2xl font-bold mb-6 text-center">Editar Libro</h2>
            <form onSubmit={handleSubmit}>
                {/* Título */}
                <div className="mb-4">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                        Título del libro
                    </label>
                    <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder=""
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sinopsis" className="block text-sm font-medium text-gray-700">
                        Sinopsis del libro
                    </label>
                    <input
                        type="text"
                        name="sinopsis"
                        value={formData.sinopsis}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Sinopsis del libro"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="autor" className="block text-sm font-medium text-gray-700">
                        Autor del libro
                    </label>
                    <input
                        type="text"
                        name="autor"
                        value={formData.autor}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Autor del libro"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="editorial" className="block text-sm font-medium text-gray-700">
                        Editorial
                    </label>
                    <input
                        type="text"
                        name="editorial"
                        value={formData.editorial}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Editorial del libro"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                        Precio
                    </label>
                    <input
                        type="text"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Precio del libro"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="isbn" className="block text-sm font-medium text-gray-700">
                        ISBN
                    </label>
                    <input
                        type="text"
                        name="isbn"
                        value={formData.isbn}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="ISBN del libro"
                        required
                    />
                </div>

                {/* Botón de enviar */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Modificar Libro
                    </button>
                </div>
            </form>
            <p>{mensaje}</p> {/* terminar */}
        </div>
    )
}
