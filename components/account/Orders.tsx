import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Order } from "@/types/Order";
import LoadingSpinner from "../loader";

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchOrders = async () => {
            try {
                const response = await fetch("/api/orders");

                if (!response.ok) {
                    return;
                }

                const data = await response.json();

                if (!data) {
                    return;
                }

                const orders: Order[] = data.orders;

                setOrders(orders);
            } catch (error) {
                console.error("Ha habido un error consultando los pedidos", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-4">
                Mis Pedidos
            </h2>

            <div className="relative">
                {isLoading ? (
                    <LoadingSpinner className="shadow-md sm:rounded-lg" />
                ) : (
                    <>
                        {orders.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full shadow-md sm:rounded-lg">
                            {orders.map((order) => (
                                <AccordionItem
                                    key={order.id}
                                    value={`item-${order.id}`}
                                >
                                    <AccordionTrigger className="w-full flex flex-col md:flex-row md:justify-between items-center p-4 hover:no-underline hover:bg-gray-100">
                                        <div>
                                            Realizado el {' '}
                                            <span className="font-bold">
                                                {formatDate(order.createdDate)}
                                            </span>
                                        </div>
                                        <Separator orientation="vertical" className="hidden md:block" />
                                        <div className="font-bold">
                                            {order.status}
                                        </div>
                                        <Separator orientation="vertical" className="hidden md:block" />
                                        <div className="font-bold">{order.totalAmount} €</div>
                                    </AccordionTrigger>
                                    <AccordionContent className="w-full p-4 bg-gray-50 flex flex-col md:flex-row justify-center flex-wrap gap-6">
                                        {order.details.map((detail) => (
                                            <div
                                                key={detail.id}
                                                className="w-full md:w-2/12 flex flex-col items-center gap-2"
                                            >
                                                <Link
                                                    href={`/books/detail/${detail.book.id}`}
                                                    className="hover:brightness-110 transition-all duration-200"
                                                >
                                                    <Image
                                                        src={`/resources/images/${detail.book.image}`}
                                                        alt={detail.book.title}
                                                        width={100}
                                                        height={150}
                                                        className="object-contain rounded"
                                                    />
                                                </Link>
                                                <div className="w-full text-lg text-center">
                                                    {detail.book.title}
                                                </div>
                                                <div className="text-md text-center">
                                                    {detail.quantity} x{' '}
                                                    {detail.book.price} €
                                                </div>
                                            </div>
                                        ))}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                            </Accordion>
                        ) : (
                            <div className="py-12">
                                <p>No hay nigún pedido...</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
