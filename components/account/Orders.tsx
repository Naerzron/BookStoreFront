import { useEffect, useState } from "react";

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
                console.log(orders);

                setOrders(orders);
            } catch (error) {
                console.log(error);
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
            <ul>
                {orders.map((order) => (
                    <li key={order.id}>{order.id}</li>
                ))}
            </ul>
        </div>
    );
};
