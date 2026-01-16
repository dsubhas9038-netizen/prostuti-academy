import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - ProstutiAcademy',
    description: 'Terms and conditions for using ProstutiAcademy educational platform',
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
