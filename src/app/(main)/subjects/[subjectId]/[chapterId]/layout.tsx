import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Chapter',
        template: '%s | ProstutiAcademy',
    },
};

export default function ChapterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
