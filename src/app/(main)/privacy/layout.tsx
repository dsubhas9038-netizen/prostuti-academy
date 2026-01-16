import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - ProstutiAcademy',
    description: 'How we collect, use, and protect your personal information at ProstutiAcademy',
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
