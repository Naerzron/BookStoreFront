"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo de artículo del carrito
type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

// Define el contexto
type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                // Si el artículo ya está en el carrito, incrementa su cantidad
                return prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para usar el contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un CartProvider");
    }
    return context;
};
