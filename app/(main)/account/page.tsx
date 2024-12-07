"use client";

import { useState } from "react";
import Navbar from "@/components/main-navbar";
import ChangePassword from "@/components/account/ChangePassword";
import { ProfileForm } from "@/components/account/ProfileForm";
import { Orders } from "@/components/account/Orders";
import { useAuth } from "@/contexts/AuthContext";
import Login from "@/app/(auth)/login/page";

export default function Account() {
    const [activeTab, setActiveTab] = useState<"profile" | "orders" | "changePassword">("profile");
    const { isLoggedIn } = useAuth();

    if( !isLoggedIn )
        return <Login />;
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="flex flex-1 flex-col md:flex-row items-start px-12 pt-32 pb-12 gap-4 md:gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-md p-6 md:sticky md:top-3 border border-gray-2002">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-6">Mi cuenta</h1>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeTab === "profile"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            }`}
                        >
                            Mis datos
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeTab === "orders"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            }`}
                        >
                            Mis pedidos
                        </button>
                        <button
                            onClick={() => setActiveTab("changePassword")}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeTab === "changePassword"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            }`}
                        >
                            Cambiar Contraseña
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <main className="w-full border border-gray-200 bg-white dark:bg-gray-700 p-6 md:p-12 rounded-lg shadow-md overflow-auto">
                    {activeTab === "profile" && <ProfileForm />}
                    {activeTab === "orders" && <Orders />}
                    {activeTab === "changePassword" && <ChangePassword />}
                </main>
            </div>
        </div>
    );
}
