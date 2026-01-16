export default function QuestionDetailPage({ params }: { params: Promise<{ questionId: string }> }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Question Detail Page
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
                Question detail view - Coming in Phase 4
            </p>
        </div>
    );
}
