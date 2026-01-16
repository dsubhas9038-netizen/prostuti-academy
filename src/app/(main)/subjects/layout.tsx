import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Subjects - বিষয়সমূহ',
    description: 'West Bengal HS Arts এর সব subjects - Bengali, English, History, Geography, Philosophy, Political Science, Education, Sanskrit।',
};

export default function SubjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
