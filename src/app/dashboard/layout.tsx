import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Dashboard',
        template: '%s | Dashboard | ProstutiAcademy',
    },
    description: 'তোমার learning dashboard - progress, bookmarks, tests সব এক জায়গায়।',
};

export default function DashboardGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
