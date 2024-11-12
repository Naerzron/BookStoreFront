import React from "react";
import Link from "next/link";

const MainNavbar = () => {
    return (
        <div className="w-full h-20 bg-emerald-800 dark:bg-gray-700 sticky top-0 flex justify-between items-center px-4">
            <ul className="hidden md:flex gap-x-6 text-white dark:text-gray-400">
                <li>
                    <Link href="/books">
                        <p>Libros</p>
                    </Link>
                </li>
                <li>
                    <Link href="/account">
                        <p>Mi cuenta</p>
                    </Link>
                </li>
                <li>
                    <Link href="">
                        <p>Carrito</p>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MainNavbar;
