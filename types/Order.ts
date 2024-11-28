type Order = {
    id: number,
    details: OrderDetail[],
    user: User
}

type OrderDetail = {
    id: number,
    book: Book,
    quantity: number
}