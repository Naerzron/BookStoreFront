"use client";

import Input from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


export default function Register() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [birthDate, setBirthdate] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const registerData: RegisterData = {
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            address: address,
            birthDate: birthDate,
            country: country,
            dni: dni,
            lastName: lastName,
            name: name,
            phoneNumber: phoneNumber
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerData),
            });

            const data: ApiResponse = await response.json();

            if (data.success) {
                setErrorMessage("");
                router.replace('/');
            } else {
                setErrorMessage(
                    "Error al registrar."
                );
            }
        } catch (error) {
            console.error("Error llamada:", error);
            setErrorMessage("Ocurrió un error, intenta de nuevo.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 text-center">
                    Registrarse
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Nombre de Usuario:
                            </label>
                            <Input value={userName} onChange={setUserName} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Email:
                            </label>
                            <Input type="email" value={email} onChange={setEmail} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Contraseña:
                            </label>
                            <Input type="password" value={password} onChange={setPassword} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Confirmar Contraseña:
                            </label>
                            <Input type="password" value={confirmPassword} onChange={setConfirmPassword} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Nombre:
                            </label>
                            <Input value={name} onChange={setName} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Apellido:
                            </label>
                            <Input value={lastName} onChange={setLastName} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Dirección:
                            </label>
                            <Input value={address} onChange={setAddress} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Fecha de Nacimiento:
                            </label>
                            <Input type="date" value={birthDate} onChange={setBirthdate} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                País:
                            </label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Selecciona un país</option>
                                <option value="ES">España</option>
                                <option value="IT">Italia</option>
                                <option value="FR">Francia</option>
                                <option value="DE">Alemania</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                DNI:
                            </label>
                            <Input value={dni} onChange={setDni} />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                                Teléfono:
                            </label>
                            <Input value={phoneNumber} onChange={setPhoneNumber} />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                        Registrarse
                    </button>
                </form>
                {errorMessage && (
                    <p className="text-red-500 text-center">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}
