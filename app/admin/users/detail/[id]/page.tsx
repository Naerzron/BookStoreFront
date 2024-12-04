"use client";

import { OrderDetails } from "@/components/admin/users/OrderDetails";
import { UserDetails } from "@/components/admin/users/UserDetails";
import { useState } from "react";

export default function AdminUserDetail() {
    
    const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex flex-col">

            {/* Main Content */}
            <div className="flex flex-1 flex-col md:flex-row items-start px-12 pt-32 pb-12 gap-4 md:gap-12">
                {/* Sidebar */}
                <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 shadow-md p-6 md:sticky md:top-3 border border-gray-2002">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-6">Panel de usuario</h1>
                    <nav className="space-y-4">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeTab === "profile"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            }`}
                        >
                            Datos
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`w-full text-left px-4 py-2 rounded-md font-medium ${
                                activeTab === "orders"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            }`}
                        >
                            Pedidos
                        </button>
                    </nav>
                </aside>

                {/* Content */}
                <main className="w-full border border-gray-200 bg-white dark:bg-gray-700 p-6 md:p-12 rounded-lg shadow-md overflow-auto">
                    {activeTab === "profile" && <UserDetails />}
                    {activeTab === "orders" && <OrderDetails />}
                </main>
            </div>
        </div>
    )
}
