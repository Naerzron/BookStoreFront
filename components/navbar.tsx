
"use client"

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

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
              router.replace("/login");
              
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
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400">
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
                <Link href="#">
                  <p>nada de momento puta</p>
                </Link>
              </li>
            </ul>
        </div>
  );
};

export default Navbar;