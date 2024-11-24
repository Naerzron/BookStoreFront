"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

export default function CartPage() {
    const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart();
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {} as Record<number, number>)
    );

    // Calcular el total
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Manejar cambios en el input de cantidad
    const handleQuantityChange = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return; // Evitar cantidades menores a 1
        setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
        updateCartItem(id, newQuantity); // Actualizar la cantidad en el estado global del carrito
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex items-center justify-center p-6">
            <div className="max-w-6xl w-full bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 grid grid-cols-1 gap-6">
                {/* Título */}
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center">
                    Carrito de Compras
                </h1>

                {/* Contenido */}
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        Tu carrito está vacío.
                    </p>
                ) : (
                    <div className="space-y-6">
                        {/* Lista de artículos */}
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                            >
                                <div className="space-y-2">
                                    <h2 className="font-bold text-lg text-gray-800 dark:text-gray-300">
                                        {item.title}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        €{item.price} x{" "}
                                        <input
                                            type="number"
                                            value={quantities[item.id] || item.quantity}
                                            min="1"
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    item.id,
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            className="w-16 text-center border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                                        />
                                    </p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 dark:text-red-400 hover:underline font-semibold"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}

                        {/* Total y acciones */}
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                                    Total:
                                </span>
                                <p className="text-green-600 font-bold dark:text-green-400 text-2xl mt-2">
                                    €{total.toFixed(2)}
                                </p>
                            </div>
                            <button
                                onClick={clearCart}
                                className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                            >
                                Vaciar carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
