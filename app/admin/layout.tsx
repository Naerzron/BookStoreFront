import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

interface AdminPanelLayoutProps {
    children: React.ReactNode
}

export default function AdminPanelLayout({ children }: AdminPanelLayoutProps) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}