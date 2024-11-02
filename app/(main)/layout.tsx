import MainNavbar from "@/components/main-navbar"

interface MainLayoutProps {
    children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <main className="relative w-full mx-auto lg:max-w-6xl">
            <MainNavbar />
            {children}
        </main>
    )
}