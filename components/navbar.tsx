"use client";

import Cookies from "js-cookie";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { BookType, CircleUserRound, LibraryBig, LogOut, Menu, NotebookPen, UserPlus, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const { handleCtxLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data: ApiResponse = await response.json();

    if (data.success) {
      Cookies.remove("jwt");
      router.replace("/");
      handleCtxLogout();
    }
  };

  return (
    <div className="w-full h-[8vh] bg-emerald-800 dark:bg-gray-700 sticky top-0 flex items-center justify-between px-6 py-4 z-50">
      {/* Sección izquierda: enlaces y menú hamburguesa */}
      <div className="flex items-center gap-x-6">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Menú de navegación (visible solo en móvil) */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute top-[8vh] left-0 w-full bg-emerald-800 dark:bg-gray-700 md:relative md:top-0 md:w-auto md:flex md:gap-x-6 text-white dark:text-gray-400 items-center py-4`}
        >
          <li className="py-2 px-4">
            <Link href="/admin/books/create" className="flex items-center gap-2">
              <NotebookPen strokeWidth={1} className="w-6 h-6" />
              Crear Libro
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/admin/genres/create" className="flex items-center gap-2">
              <BookType strokeWidth={1} className="w-6 h-6" />
              Crear Género
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/admin/authors/create" className="flex items-center gap-2">
              <UserPlus strokeWidth={1} className="w-6 h-6" />
              Crear Autor
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/admin/books" className="flex items-center gap-2">
              <LibraryBig strokeWidth={1} className="w-6 h-6" />
              Ver Lista Libros
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/admin/users" className="flex items-center gap-2">
              <CircleUserRound strokeWidth={1} className="w-6 h-6" />
              Usuarios
            </Link>
          </li>
          {/* Botón de cerrar sesión en menú hamburguesa */}
          <li className="block md:hidden py-2 px-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition flex items-center gap-2 w-full"
            >
              <LogOut strokeWidth={1} className="w-6 h-6" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Sección central: título (solo en móvil) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold md:hidden block">
        Admin Panel
      </div>

      {/* Sección derecha: botón de cerrar sesión en vista de escritorio */}
      <div className="hidden md:block py-4 px-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Navbar;
