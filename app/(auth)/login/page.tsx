"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
    const { handleCtxLogin } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data: LoginResponse = await response.json();
            if (data.success) {
                setErrorMessage("");
                handleCtxLogin();
                
                if (data.userRole === 'Administrador') {
                    router.replace('/admin/books');
                } else {
                    router.replace('/');
                }
                router.refresh();
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 text-center">
                    Iniciar Sesión
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            Usuario:
                        </span>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">
                            Contraseña:
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                        Iniciar Sesión
                    </button>
                </form>
                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}
                <button
                    onClick={() => {
                        router.push("/register")
                    }}
                    className="w-full mt-2 text-blue-500 dark:text-blue-400 text-center hover:underline focus:outline-none"
                >
                    ¿No tienes una cuenta? Regístrate aquí
                </button>
            </div>
        </div>
    );
}
