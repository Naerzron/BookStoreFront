"use client";

import { useState } from "react";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            setSuccessMessage("");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5141/api/account/change-password/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentPassword, newPassword }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Contraseña actualizada con éxito.");
                setErrorMessage("");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                setErrorMessage(data.message || "Error al cambiar la contraseña.");
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            setErrorMessage("Error inesperado. Por favor, inténtalo de nuevo.");
            setSuccessMessage("");
        }
    };

    return (
        <div className="p-6 bg-white shadow-md rounded-md dark:bg-gray-800">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">Cambiar Contraseña</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">Contraseña Actual:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-medium">Confirmar Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Cambiar Contraseña
                </button>
            </form>
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
        </div>
    );
}
