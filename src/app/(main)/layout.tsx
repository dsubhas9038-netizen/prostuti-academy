import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Subjects',
        template: '%s | ProstutiAcademy',
    },
};

export default function MainGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
