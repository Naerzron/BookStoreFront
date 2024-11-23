import { CartProvider } from "@/contexts/CartContext";
import MainNavbar from "@/components/main-navbar";

interface MainLayoutProps {
    children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <MainNavbar />
            <CartProvider>
                {children}
            </CartProvider>
           
        </>
    );
}
