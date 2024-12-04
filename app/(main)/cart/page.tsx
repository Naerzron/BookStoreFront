"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
    const { isLoggedIn } = useAuth();
    const { cartItems, updateCartItem, removeFromCart, clearCart } = useCart();
    const [quantities, setQuantities] = useState(
        cartItems.reduce((acc, item) => {
            acc[item.id] = item.quantity;
            return acc;
        }, {} as Record<number, number>)
    );

    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal

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

        // Mostrar notificación
        toast({
            variant: "default",
            title: "Cantidad actualizada",
            description: `Has cambiado la cantidad a ${newQuantity}.`,
        });
    };

    const handleConfirmOrder = async () => {
        try {
            const response = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cartItems),
            });

            if (!response.ok) {
                throw new Error("Failed to create the order");
            }

            const data = await response.json();

            clearCart(); // Vaciar el carrito después de confirmar
            setIsModalOpen(false); // Cerrar el modal

            // Mostrar notificación
            toast({
                variant: "destructive",
                title: "Has vaciado el carrito"
            });
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex justify-center p-6 pt-28">
            <div className="max-w-6xl w-full h-fit bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 grid grid-cols-1 gap-6">
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
                    <div className="w-full space-y-6">
                        <div className="space-y-6">
                            {/* Lista de artículos */}
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4"
                                >
                                    <div className="flex gap-4">
                                        <div>
                                            <Image
                                                src={`/resources/images/${item.image}`}
                                                width={100}
                                                height={200}
                                                alt={item.title}
                                                className="rounded-md object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-lg text-gray-800 dark:text-gray-300">
                                                {item.title}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                €{item.price} x{" "}
                                                <input
                                                    type="number"
                                                    value={
                                                        quantities[item.id] ||
                                                        item.quantity
                                                    }
                                                    min="1"
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.id,
                                                            parseInt(
                                                                e.target.value,
                                                                10
                                                            )
                                                        )
                                                    }
                                                    className="w-16 text-center border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant={"destructive"}
                                        onClick={() => removeFromCart(item.id)}
                                        className="font-semibold"
                                    >
                                        <X />
                                        Eliminar
                                    </Button>
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
                                    onClick={() => clearCart()}
                                    className="bg-red-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                                >
                                    Vaciar carrito
                                </button>
                            </div>
                        </div>
                        <Separator />
                        <div className="w-full">
                            {isLoggedIn ? (
                                <Button
                                    variant={"success"}
                                    onClick={() => setIsModalOpen(true)} // Mostrar modal
                                    className="w-full p-6 font-medium text-xl shadow-md"
                                >
                                    <ShoppingCart />
                                    Confirmar pedido
                                </Button>
                            ) : (
                                <Button
                                    variant={'outline'}
                                    className="w-full text-lg"
                                >
                                    <Link
                                        href={'/login'}
                                    >
                                        Iniciar sesión para continuar con el pedido
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                                ¿Confirmar pedido?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                ¿Estás seguro de que deseas confirmar tu pedido?
                            </p>
                            <div className="flex justify-end space-x-4">
                                <Button
                                    variant="secondary"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    variant="success"
                                    onClick={handleConfirmOrder}
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
