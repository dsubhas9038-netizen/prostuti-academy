import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Leaderboard - ProstutiAcademy',
    description: 'Compete with students and climb the leaderboard',
};

export default function LeaderboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
