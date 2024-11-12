"use client";

import React, { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5141/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                // Guarda el token en localStorage o en un estado global (según el caso)
                localStorage.setItem("token", data.token);
                // Redirige o muestra un mensaje de éxito
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
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <label>
                    Usuario:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Iniciar Sesión</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}
