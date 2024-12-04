"use client";

import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthDate: string;
    country: string;
    dni: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                setError("");

                const response = await fetch("/api/users", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();
                setUsers(data.users);
            } catch (error) {
                setError(`${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-8 px-16 pt-12">
            <h1 className="text-5xl font-bold">Panel de Administración de Usuarios</h1>

            {isLoading ? (
                <h1 className="animate-pulse">Cargando...</h1>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                            <tr>
                                <th className="px-6 py-3">Nombre</th>
                                <th className="px-6 py-3">Apellido</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Teléfono</th>
                                <th className="px-6 py-3">País</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {users.map((user) => (
                                <tr
                                    key={user.id}
                                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4">{user.lastName}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phoneNumber}</td>
                                    <td className="px-6 py-4">{user.country}</td>
                                    <td className="px-6 py-4 flex justify-center space-x-4">
                                        <Link
                                            href={`/admin/users/detail/${user.id}`}
                                            className="flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <DocumentMagnifyingGlassIcon className="w-5 h-5 mr-1" />
                                            Ver
                                        </Link>
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
