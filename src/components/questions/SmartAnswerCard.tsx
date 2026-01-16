'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  BookOpen,
  Share2,
  Bookmark,
  Volume2
} from 'lucide-react';
import { Question } from '@/types';
import { Button, Badge } from '@/components/ui';
import WordCountIndicator from './WordCountIndicator';
import MarkingStrategyCard from './MarkingStrategyCard';
import { cn } from '@/lib/utils';

interface SmartAnswerCardProps {
  question: Question;
  isExpanded?: boolean;
  onExpandToggle?: () => void;
  showWordCount?: boolean;
  showMarkingStrategy?: boolean;
  showActions?: boolean;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  className?: string;
}

function SmartAnswerCard({
  question,
  isExpanded = false,
  onExpandToggle,
  showWordCount = true,
  showMarkingStrategy = true,
  showActions = true,
  isBookmarked = false,
  onBookmarkToggle,
  className,
}: SmartAnswerCardProps) {
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);
  const [copied, setCopied] = useState(false);

  const expanded = onExpandToggle ? isExpanded : internalExpanded;
  const toggleExpand = onExpandToggle || (() => setInternalExpanded(!internalExpanded));

  // Copy answer to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(question.answerBn || question.answer);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Share answer
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: question.questionBn,
          text: question.answerBn,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <div className={cn('rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all', className)}>
      {/* Toggle Button */}
      <button
        onClick={toggleExpand}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left transition-colors',
          expanded 
            ? 'bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800'
            : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
        )}
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            'p-2 rounded-lg',
            expanded 
              ? 'bg-blue-100 dark:bg-blue-900/30'
              : 'bg-gray-200 dark:bg-gray-700'
          )}>
            <BookOpen className={cn(
              'h-5 w-5',
              expanded ? 'text-blue-600' : 'text-gray-500'
            )} />
          </div>
          <div>
            <span className={cn(
              'font-medium',
              expanded ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
            )}>
              {expanded ? 'Hide Answer' : 'Show Answer'}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              ({question.type === 'mcq' ? 'MCQ' : `${question.wordCount.actual} words`})
            </span>
          </div>
        </div>
        <div className={cn(
          'p-1 rounded-full transition-colors',
          expanded ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-200 dark:bg-gray-700'
        )}>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Expanded Answer Section */}
      {expanded && (
        <div className="p-4 bg-white dark:bg-gray-900 space-y-4">
          {/* Answer Header */}
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="text-lg">📖</span>
              Ideal Exam-Oriented Answer
            </h4>
            {showActions && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  leftIcon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            )}
          </div>

          {/* Answer Content */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {/* Bengali Answer */}
            {question.answerBn && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg font-bengali text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {question.answerBn}
              </div>
            )}

            {/* English Answer (if no Bengali or on toggle) */}
            {!question.answerBn && question.answer && (
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {question.answer}
              </div>
            )}
          </div>

          {/* Key Points */}
          {question.keyPoints && question.keyPoints.length > 0 && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h5 className="text-sm font-medium text-green-800 dark:text-green-400 mb-2">
                🎯 Key Points to Remember
              </h5>
              <ul className="space-y-1">
                {question.keyPoints.map((point, index) => (
                  <li key={index} className="text-sm text-green-700 dark:text-green-300 flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    {point.pointBn || point.point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Word Count Indicator */}
          {showWordCount && question.type !== 'mcq' && (
            <WordCountIndicator
              wordCount={question.wordCount}
              questionType={question.type}
              size="md"
            />
          )}

          {/* Marking Strategy */}
          {showMarkingStrategy && question.markingStrategy && (
            <MarkingStrategyCard
              markingStrategy={question.markingStrategy}
              totalMarks={question.marks}
              showExpanded={false}
            />
          )}

          {/* Examiner Tips */}
          {question.examinerTipsBn && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h5 className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1 flex items-center gap-2">
                💡 Examiner's Tip
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 font-bengali">
                {question.examinerTipsBn}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          {showActions && (
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Button
                  variant={isBookmarked ? 'primary' : 'outline'}
                  size="sm"
                  onClick={onBookmarkToggle}
                  leftIcon={<Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />}
                >
                  {isBookmarked ? 'Saved' : 'Save'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  leftIcon={<Share2 className="h-4 w-4" />}
                >
                  Share
                </Button>
              </div>
              <Badge variant="secondary" size="sm">
                ✅ Mark as Read
              </Badge>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SmartAnswerCard;
