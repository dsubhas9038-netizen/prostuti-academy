import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mock Tests | ProstutiAcademy',
    description: 'Practice with mock tests and improve your exam preparation',
};

export default function TestsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
