import Navbar from "@/components/navbar"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <main>
            {children}
        </main>
    )
}