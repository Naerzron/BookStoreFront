"use client";

import { useParams } from 'next/navigation';  // Importa useParams desde next/navigation
import { useEffect, useState } from 'react';

export default function AdminUserDetail() {
    const { userId } = useParams();  // Obtén los parámetros de la ruta, como userId
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userId) {
            const fetchUserDetails = async () => {
                try {
                    // Obtén el token desde las cookies o almacenamiento local
                    const token = localStorage.getItem("authToken");  // O usa cookies si es el caso

                    const response = await fetch(`http://localhost:5141/api/account/detail/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,  // Agrega el token al encabezado
                        },
                        credentials: 'include',  // Si usas cookies
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user details');
                    }

                    const data = await response.json();
                    setUser(data);  // Guardamos los detalles del usuario en el estado
                } catch (err: any) {
                    setError(err.message || 'An unexpected error occurred');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserDetails();
        }
    }, [userId]);

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Detalles del Usuario</h1>
            {user && (
                <div>
                    <p>Nombre: {user.name} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Teléfono: {user.phoneNumber}</p>
                    <p>Dirección: {user.address}</p>
                    <p>Fecha de nacimiento: {user.birthdate}</p>
                    <p>País: {user.country}</p>
                    <p>DNI: {user.dni}</p>
                </div>
            )}
        </div>
    );
}
