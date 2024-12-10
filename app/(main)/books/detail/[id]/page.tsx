"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookDetail() {
    const router = useRouter();
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const toggleSynopsis = () => setShowFullSynopsis(!showFullSynopsis);
    const [book, setBook] = useState<GetBookResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const params = useParams();
    const id = params.id;

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        if (book) {
            addToCart({
                id: book.id,
                title: book.title,
                price: book.price,
                quantity: 1,
                image: book.image,
            });

            toast({
                variant: "success",
                title: "¡Añadido!",
                description: `Has añadido ${book.title} a tu cesta.`,
                action: (
                    <ToastAction altText="Cart link">
                        <Link
                            href={"/cart"}
                        >
                            Ver mi cesta
                        </Link>
                    </ToastAction>
                ),
            });
        }
    };

    const handleBack = () => {
        router.back();
    }

    useEffect(() => {
        setIsLoading(true);
        const fetchBook = async () => {
            try {
                const response = await fetch(`/api/books?id=${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch the book");
                }
                const book: GetBookResponse = await response.json();
                setBook(book);
            } catch (error) {
                console.error("Error fetching book: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (isLoading) {
        return (
            <div className="h-screen min-h-screen pt-20 bg-gray-50 dark:bg-gray-700">
                <div className="flex h-full items-center justify-center">
                    <Loader className="animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-700">

            <div className="w-full flex flex-col items-center gap-4 py-12">
                <div className="max-w-6xl w-full">
                    <Button
                        variant={'outline'}
                        onClick={handleBack}
                        className="self-start"
                    >
                        Volver atrás
                    </Button>
                </div>
                <div className="max-w-6xl w-full bg-white dark:bg-gray-800 shadow-md sm:rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Imagen del libro */}
                    <div className="flex-shrink-0 md:col-span-1">
                        <img
                            src={`/resources/images/${book?.image === "" ? "default.jpg" : book?.image
                                }`}
                            alt={`Portada de ${book?.title}`}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

                    {/* Información y detalles */}
                    <div className="md:col-span-1 space-y-4">
                        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mb-4 text-center md:text-left">
                            {book?.title}
                        </h1>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                    Autor:
                                </span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                    {book?.authorName}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                    Género:
                                </span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                    {book?.genreName}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-700 dark:text-gray-300 font-semibold">
                                    ISBN:
                                </span>
                                <span className="ml-2 text-gray-600 dark:text-gray-400">
                                    {book?.isbn}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Módulo de compra */}
                    <div className="md:col-span-1 space-y-4 flex flex-col items-center md:items-start ">
                        <div className="w-full flex items-start space-x-6">
                            <div className="space-y-4">
                                {/* Precio */}
                                <div className="text-center md:text-left">
                                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                                        Precio:
                                    </span>
                                    <p className="text-green-600 font-bold dark:text-green-400 text-2xl mt-2">
                                        €{book?.price}
                                    </p>
                                </div>

                                {/* Stock */}
                                <div className="text-center md:text-left">
                                    <span className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
                                        Stock:
                                    </span>
                                    <p className="text-green-600 font-bold dark:text-green-400 mt-2">
                                        {book?.stock}
                                    </p>
                                </div>
                            </div>

                            {/* Botón de añadir al carrito */}
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 bg-green-600 text-white rounded-md text-lg font-medium hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                            >
                                Añadir al carrito
                            </button>
                        </div>
                    </div>

                    {/* Sinopsis */}
                    <div className="md:col-span-3 mt-6">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
                            Sinopsis
                        </h2>
                        <p
                            className={`text-gray-600 dark:text-gray-400 mt-2 ${showFullSynopsis ? "" : "line-clamp-2"
                                }`}
                        >
                            {book?.synopsis}
                        </p>
                        <button
                            onClick={toggleSynopsis}
                            className="text-blue-500 dark:text-blue-400 hover:underline focus:outline-none mt-2"
                        >
                            {showFullSynopsis ? "Ver menos" : "Ver más"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
