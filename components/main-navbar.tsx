"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MainNavbar = () => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const response = await fetch("/api/check", {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw Error("Error comprobando el token");
                }

                const check: ApiResponse = await response.json();

                setIsLoggedIn(check.success);
            } catch (error: any) {
                setErrorMessage(error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoginStatus();
    }, [isLoggedIn]);

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
                setIsLoggedIn(false);
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
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 sticky top-0 flex justify-between items-center px-4">
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
                
                {!loading && (
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
                )}
            </ul>
        </div>
    );
};

export default MainNavbar;
