import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PYQ Analysis | ProstutiAcademy',
    description: 'Previous Year Questions analysis with trend predictions',
};

export default function PYQLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
