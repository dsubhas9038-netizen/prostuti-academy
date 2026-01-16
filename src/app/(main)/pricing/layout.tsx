import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing - ProstutiAcademy',
    description: 'Choose your plan. All features free during launch!',
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
