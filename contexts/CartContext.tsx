"use client";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { getItemWithExpiry, removeItemFromSessionStorage, setItemWithExpiry } from "@/lib/utils";
import Link from "next/link";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define el contexto
type CartContextType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateCartItem: (id: number, quantity: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Crea el proveedor del contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const loadCartItems = () => {
            const cartItems: CartItem[] | null = getItemWithExpiry('cartItems');

            if (!cartItems) {
                return;
            }

            setCartItems(cartItems);
        }

        loadCartItems();
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const existingItem = prev.find((cartItem) => cartItem.id === item.id);
            const updatedCartItems = existingItem
                ? prev.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
                : [...prev, item];

            // Actualizar sessionStorage dentro del setter de estado
            setItemWithExpiry('cartItems', updatedCartItems);

            return updatedCartItems;
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => {
            const updatedCartItems = prev.filter((cartItem) => cartItem.id !== id);

            // Actualizar sessionStorage con los elementos restantes
            setItemWithExpiry('cartItems', updatedCartItems);

            return updatedCartItems;
        });
    };

    const updateCartItem = (id: number, quantity: number) => {
        setCartItems((prev) => {
            const updatedCartItems = prev.map((cartItem) =>
                cartItem.id === id ? { ...cartItem, quantity } : cartItem
            );

            // Actualizar sessionStorage con los elementos modificados
            setItemWithExpiry('cartItems', updatedCartItems);

            return updatedCartItems;
        });
    };

    const clearCart = () => {
        setCartItems(() => {
            // Vaciar el sessionStorage
            removeItemFromSessionStorage('cartItems');
            return [];
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, clearCart }}>
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
