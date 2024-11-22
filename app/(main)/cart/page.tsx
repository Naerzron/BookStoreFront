"use client";

import { useCart } from "@/components/CartContext";

export default function CartPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    console.log(cartItems);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-4">
                            <div>
                                <p className="font-bold">{item.title}</p>
                                <p>${item.price} x {item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <button onClick={clearCart} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                        Vaciar carrito
                    </button>
                </div>
            )}
        </div>
    );
}
