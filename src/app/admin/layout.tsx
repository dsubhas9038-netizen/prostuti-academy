import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Panel - ProstutiAcademy',
    description: 'Admin dashboard for managing content and users',
};

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
