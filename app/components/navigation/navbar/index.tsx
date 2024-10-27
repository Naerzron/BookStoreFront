import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 sticky top-0 flex justify-between items-center px-4">
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400">
              <li>
                <Link href="/books/crear">
                  <p>Crear Libro</p>
                </Link>
              </li>
              <li>
                <Link href="/books">
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