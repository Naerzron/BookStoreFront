import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const UserDetails: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { id } = useParams();
    const [user, setUser] = useState<User>({
        address: '',
        birthDate: '',
        country: '',
        dni: '',
        email: '',
        emailConfirmed: false,
        id: '',
        lastName: '',
        name: '',
        phoneNumber: '',
        userName: '',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(
                    `/api/users/detail/${id}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();
                const userDetails = data.userDetails;
                setUser(userDetails);
            } catch (error) {
                setError(`${error}`);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchUserDetails();
        }
    }, []);

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    
    return (
        <form className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
                Datos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-800">
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        Nombre:
                    </label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={user.name}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={true}
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
                        value={user.lastName}
                        disabled={true}
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
                        value={user.email}
                        disabled={true}
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
                        value={user.phoneNumber}      
                        disabled={true}
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
                        value={user.address}
                        disabled={true}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold">
                        País:
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="country"
                        value={user.country || ""}
                        disabled={true}
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
                        value={user.dni}
                        disabled={true}
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
                        value={user.birthDate}
                        disabled={true}
                    />
                </div>
            </div>
        </form>
    );
};
