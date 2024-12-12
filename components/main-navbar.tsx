"use client";

import { useAuth } from "@/contexts/AuthContext";
import { CircleUserRound, LibraryBig, LogIn, LogOut, Menu, MessageCircleQuestion, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MainNavbar = () => {
    const { isLoggedIn, handleCtxLogout } = useAuth();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                handleCtxLogout();
                router.replace("/");
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
        }
    };

    return (
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 fixed top-0 flex items-center justify-between px-4 z-50">
            {/* Botón de hamburguesa para móviles */}
            <div className="flex items-center md:hidden">
                <button
                    className="text-white dark:text-gray-400"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Menú para pantallas grandes */}
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400 items-center">
                <li>
                    <Link href="/books" className="flex items-center gap-2">
                        <LibraryBig strokeWidth={1} className="w-6 h-6" />
                        <p>Libros</p>
                    </Link>
                </li>
                <li>
                    <Link href="/account" prefetch={false} className="flex items-center gap-2">
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
                    <Link href="/faqs" className="flex items-center gap-2">
                        <MessageCircleQuestion strokeWidth={1} className="w-6 h-6" />
                        <p>Ayuda</p>
                    </Link>
                </li>
                <li className="relative group">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <MessageCircleQuestion strokeWidth={1} className="w-6 h-6" />
                        <p>Acerca de..</p>
                    </div>
                    <div className="absolute left-0 mt-2 hidden w-72 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-md group-hover:block group-focus:block z-50">
                        <p className="text-center">
                            Aplicación desarrollada por <strong>Antonio José López Cobo</strong> como proyecto final de DAW para el instituto <strong>IES Trassierra</strong>.
                        </p>
                        <div className="absolute left-4 top-[-8px] w-0 h-0 border-l-8 border-l-transparent border-b-8 border-b-gray-800 border-r-8 border-r-transparent"></div>
                    </div>
                </li>
            </ul>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex-grow flex justify-center">
                <h1 className="text-2xl font-bold text-white dark:text-gray-200">Naher&apos;s Vault</h1>
            </div>

            {/* Botón de inicio/cierre de sesión a la derecha */}
            <div className="hidden md:flex">
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2"
                    >
                        <LogOut strokeWidth={1} className="w-6 h-6" />
                        Cerrar sesión
                    </button>
                ) : (
                    <Link href="/login" prefetch={false}>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2 w-full">
                            <LogIn strokeWidth={1} className="w-6 h-6" />
                            Iniciar sesión
                        </button>
                    </Link>
                )}
            </div>

            {/* Menú desplegable para móviles */}
            {isMenuOpen && (
                <ul className="absolute top-[8vh] left-0 w-full bg-emerald-800 dark:bg-gray-700 flex flex-col gap-y-4 text-white dark:text-gray-400 p-4 md:hidden">
                    <li>
                        <Link href="/books" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                            <LibraryBig strokeWidth={1} className="w-6 h-6" />
                            <p>Libros</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/account" prefetch={false} className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                            <CircleUserRound strokeWidth={1} className="w-6 h-6" />
                            <p>Mi cuenta</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                            <ShoppingBag strokeWidth={1} className="w-6 h-6" />
                            <p>Carrito</p>
                        </Link>
                    </li>
                    <li>
                        <Link href="/faqs" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                            <MessageCircleQuestion strokeWidth={1} className="w-6 h-6" />
                            <p>Ayuda</p>
                        </Link>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <button
                                onClick={(e) => {
                                    handleLogout(e);
                                    setIsMenuOpen(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2 w-full"
                            >
                                <LogOut strokeWidth={1} className="w-6 h-6" />
                                Cerrar sesión
                            </button>
                        ) : (
                            <Link href="/login" prefetch={false} onClick={() => setIsMenuOpen(false)}>
                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2 w-full">
                                    <LogIn strokeWidth={1} className="w-6 h-6" />
                                    Iniciar sesión
                                </button>
                            </Link>
                        )}
                    </li>
                </ul>
            )}
        </div>
    );
};

export default MainNavbar;
