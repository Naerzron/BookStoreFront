"use client";

import Cookies from "js-cookie";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const {handleCtxLogout} = useAuth();
  
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
    <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 sticky top-0 flex justify-between items-center px-4">
      <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400 items-center">
        <li>
          <Link href="/admin/books/create">
            <p>Crear Libro</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/genres/create">
            <p>Crear Género</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/authors/create">
            <p>Crear Autor</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/books">
            <p>Ver lista libros</p>
          </Link>
        </li>
        <li>
          <Link href="/admin/users">
            <p>Usuarios</p>
          </Link>
        </li>
        <li>
          {/* Botón para cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
