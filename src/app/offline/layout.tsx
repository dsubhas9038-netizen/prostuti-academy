import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Offline - ProstutiAcademy',
    description: 'You are currently offline. Some content may not be available.',
};

export default function OfflineLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
