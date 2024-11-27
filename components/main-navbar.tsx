"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MainNavbar = () => {
    const { isLoggedIn, handleCtxLogout } = useAuth();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data: ApiResponse = await response.json();

            if (data.success) {
                setErrorMessage("");
                router.replace("/");
                handleCtxLogout();
            } else {
                setErrorMessage(
                    "Error de autenticación. Verifica tus credenciales."
                );
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            setErrorMessage("Ocurrió un error, intenta de nuevo.");
        }
    };

    return (
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 fixed top-0 flex justify-between items-center px-4">
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400 items-center">
                <li>
                    <Link href="/books">
                        <p>Libros</p>
                    </Link>
                </li>
                <li>
                    <Link href="/account?redirect=/account">
                        <p>Mi cuenta</p>
                    </Link>
                </li>
                <li>
                    <Link href="/cart">
                        <p>Carrito</p>
                    </Link>
                </li>
                <li>
                    {/* Botón condicional */}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                        >
                            Cerrar sesión
                        </button>
                    ) : (
                        <Link href="/login">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                                Iniciar sesión
                            </button>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default MainNavbar;
