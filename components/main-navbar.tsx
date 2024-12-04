"use client";

import { useAuth } from "@/contexts/AuthContext";
import { CircleUserRound, LibraryBig, LogIn, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MainNavbar = () => {
    const { isLoggedIn, handleCtxLogout } = useAuth();
    const router = useRouter();

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
                router.replace("/");
                handleCtxLogout();
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    };

    return (
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 fixed top-0 flex justify-between items-center px-4 z-50">
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400 items-center">
                <li>
                    <Link href="/books" className="flex items-center gap-2">
                        <LibraryBig strokeWidth={1} className="w-6 h-6" />
                        <p>Libros</p>
                    </Link>
                </li>
                <li>
                    <Link href="/account" className="flex items-center gap-2">
                        <CircleUserRound strokeWidth={1} className="w-6 h-6" />
                        <p>Mi cuenta</p>
                    </Link>
                </li>
                <li>
                    <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingBag strokeWidth={1} className="w-6 h-6" />
                        <p>Carrito</p>
                    </Link>
                </li>
                <li>
                    {/* Botón condicional */}
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition flex items-center gap-4"
                        >
                            <LogOut strokeWidth={1} className="w-6 h-6" />
                            Cerrar sesión
                        </button>
                    ) : (
                        <Link href="/login">
                            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition flex items-center gap-4">
                                <LogIn strokeWidth={1} className="w-6 h-6" />
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
