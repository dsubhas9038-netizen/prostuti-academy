import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Study Resources | ProstutiAcademy',
    description: 'Download notes, guides, syllabus, model papers and more',
};

export default function ResourcesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
