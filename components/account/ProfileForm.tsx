"use client";

import { useEffect, useState } from "react";

type ProfileForm = {
    name: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    birthDate: string,
    country: string,
    dni: string
}

export const ProfileForm = () => {
    
    const [profileForm, setProfileForm] = useState<ProfileForm>({
        name: "",
        address: "",
        birthDate: "",
        country: "",
        dni: "",
        email: "",
        lastName: "",
        phoneNumber: ""
    })
    
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setisEditing] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProfileForm({...profileForm, "country": e.target.value})
    }

    const handleSaveChanges = async () => {
        try {
            await fetch(
                `http://localhost:5141/api/account`,
                {
                    method: "POST",
                    credentials: "include", //Incluye las cookies del token de autenticacion
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(profileForm),
                    
                }
            );
        }
        catch(error) {
            console.error("Error changing user account", error);

        }
    }

    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5141/api/account`,
                    {
                        method: "GET",
                        credentials: "include" //Incluye las cookies del token de autenticacion
                    }
                );
                const data: ProfileForm = await response.json();
                setProfileForm({
                    name: data.name,
                    address: data.address,
                    birthDate: data.birthDate,
                    country: data.country,
                    dni: data.dni,
                    email: data.email,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user account", error);
            }
        };

        fetchUserAccount();
    }, [])
    
    if(isLoading) return;

    return (

        <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-800 p-6 bg-white shadow-md rounded-md">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={profileForm.name}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Apellido:
                    </label>
                    <input
                        type="text"
                        placeholder="Apellido"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="lastName"
                        value={profileForm.lastName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Email:
                    </label>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        value={profileForm.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Teléfono:
                    </label>
                    <input
                        type="tel"
                        placeholder="Número de teléfono"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="phoneNumber"
                        value={profileForm.phoneNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Dirección:
                    </label>
                    <input
                        type="text"
                        placeholder="Dirección"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="address"
                        value={profileForm.address}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        País:
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="country"
                        value={profileForm.country || ""}
                        onChange={handleSelectChange}
                        disabled={!isEditing}
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
                        Dni:
                    </label>
                    <input
                        type="text"
                        placeholder="Dni"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="dni"
                        value={profileForm.dni}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Fecha de nacimiento:
                    </label>
                    <input
                        type="date"
                        placeholder="Fecha de nacimiento"
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="birthDate"
                        value={profileForm.birthDate}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                    />
                </div>
                <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                hidden={isEditing}
                onClick={() => setisEditing(true)}
                >
                    Editar Datos
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    hidden={!isEditing}
                    onClick={handleSaveChanges}
                >
                    Guardar Cambios
                </button>
            </div>
            
        </form>
    );
};