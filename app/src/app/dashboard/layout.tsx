import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DashboardLayoutClient } from './DashboardLayoutClient';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <DashboardLayoutClient>
                {children}
            </DashboardLayoutClient>
            <Footer />
        </>
    );
}
