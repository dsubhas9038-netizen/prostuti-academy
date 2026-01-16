import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'Subject',
        template: '%s | ProstutiAcademy',
    },
};

export default function SubjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
