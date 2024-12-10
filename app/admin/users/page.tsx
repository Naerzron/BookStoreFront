"use client";

import LoadingSpinner from "@/components/loader";
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
        <section className="min-h-[92vh] py-12">
            <div className="flex flex-col justify-center items-center gap-8 px-4 sm:px-8 lg:px-16">
                <h1 className="text-3xl font-bold text-center">
                    Panel de Administración de Usuarios
                </h1>

                {isLoading ? (
                    <LoadingSpinner className="bg-transparent" />
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                <tr>
                                    <th className="px-4 py-3 sm:px-6">
                                        Nombre
                                    </th>
                                    <th className="px-4 py-3 sm:px-6">
                                        Apellido
                                    </th>
                                    <th className="px-4 py-3 sm:px-6">Email</th>
                                    <th className="px-4 py-3 sm:px-6">
                                        Teléfono
                                    </th>
                                    <th className="px-4 py-3 sm:px-6">País</th>
                                    <th className="px-4 py-3 sm:px-6">
                                        Acción
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="px-4 py-4 sm:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-4 sm:px-6">
                                            {user.lastName}
                                        </td>
                                        <td className="px-4 py-4 sm:px-6">
                                            {user.email}
                                        </td>
                                        <td className="px-4 py-4 sm:px-6">
                                            {user.phoneNumber}
                                        </td>
                                        <td className="px-4 py-4 sm:px-6">
                                            {user.country}
                                        </td>
                                        <td className="px-4 py-4 sm:px-6 flex justify-center space-x-4">
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
        </section>
    );
}
