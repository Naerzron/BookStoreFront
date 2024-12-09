import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

import { ONE_WEEK_IN_MS } from "@/lib/constants";

/**
 * Guarda un elemento en el sessionStorage con tiempo de expiración.
 * @param key - La clave bajo la cual se guardará el valor.
 * @param value - El valor a guardar, que será convertido a JSON.
 * @param ttl - Tiempo de vida en milisegundos (Time To Live).
 */
export const setItemWithExpiry = (
    key: string,
    value: unknown,
    ttl: number = ONE_WEEK_IN_MS
): void => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        try {
            const now = Date.now();
            const item = {
                value,
                expiry: now + ttl,
            };
            window.sessionStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            //console.error("Error al guardar en sessionStorage:", error);
        }
    } else {
        //console.warn("sessionStorage no está disponible en este entorno.");
    }
};

/**
 * Obtiene un elemento del sessionStorage y verifica si ha expirado.
 * @param key - La clave del elemento a recuperar.
 * @returns El valor del elemento o `null` si ha expirado o no existe.
 */
export const getItemWithExpiry = <T>(key: string): T | null => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        try {
            const itemStr = window.sessionStorage.getItem(key);
            if (!itemStr) return null;

            const item = JSON.parse(itemStr) as { value: T; expiry: number };
            const now = Date.now();

            if (now > item.expiry) {
                window.sessionStorage.removeItem(key);
                return null;
            }

            return item.value;
        } catch (error) {
            //console.error("Error al obtener del sessionStorage:", error);
            return null;
        }
    } else {
        //console.warn("sessionStorage no está disponible en este entorno.");
        return null;
    }
};

/**
 * Elimina un elemento del sessionStorage.
 * @param key - La clave del elemento a eliminar.
 */
export const removeItemFromSessionStorage = (key: string): void => {
    if (typeof window !== "undefined" && window.sessionStorage) {
        try {
            window.sessionStorage.removeItem(key);
        } catch (error) {
            //console.error("Error al eliminar del sessionStorage:", error);
        }
    } else {
        //console.warn("sessionStorage no está disponible en este entorno.");
    }
};

export const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
