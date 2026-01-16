import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Study Planner - ProstutiAcademy',
    description: 'Plan and track your study schedule',
};

export default function StudyPlannerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
