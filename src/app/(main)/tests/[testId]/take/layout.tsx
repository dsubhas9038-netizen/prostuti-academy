import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Take Test | ProstutiAcademy',
    description: 'Take mock test and practice for exams',
};

export default function TestTakeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
