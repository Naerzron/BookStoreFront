"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 sm:px-12 lg:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Acerca de */}
        <div className="mb-6 sm:mb-0 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-2">Acerca de Nosotros</h3>
          <p className="text-sm sm:text-base">
            Somos una tienda en línea dedicada a ofrecer los mejores libros a nuestros
            clientes. Encuentra tus próximos libros favoritos con nosotros.
          </p>
        </div>

        {/* Redes Sociales */}
        <div className="flex gap-6 justify-center sm:justify-start mb-6 sm:mb-0">
          <Link href="https://www.instagram.com" target="_blank">
            <Instagram className="w-6 h-6 text-white hover:text-emerald-500 transition-all" />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <Twitter className="w-6 h-6 text-white hover:text-emerald-500 transition-all" />
          </Link>
        </div>

        {/* Contacto */}
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-bold mb-2">Contacto</h3>
          <p className="text-sm sm:text-base">
            <Link href="mailto:contacto@tienda.com" className="flex items-center justify-center sm:justify-end text-white hover:text-emerald-500">
              <Mail className="w-5 h-5 mr-2" />
              contacto@tienda.com
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tienda de Libros. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
