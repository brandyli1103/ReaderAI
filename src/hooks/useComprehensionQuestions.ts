
import { useState, useEffect } from 'react';

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface ComprehensionQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
  hint: string;
  explanation: string;
  type: 'multiple-choice' | 'drag-drop' | 'image-match';
  category: 'character' | 'plot' | 'vocabulary' | 'prediction' | 'main-idea' | 'details' | 'sequence' | 'cause-effect';
  pageNumber: number;
}

const sampleQuestions: ComprehensionQuestion[] = [
  {
    id: 'q1',
    question: 'How does Emma feel when she discovers the shimmering path?',
    options: [
      { id: 'a', text: 'Scared and worried', isCorrect: false },
      { id: 'b', text: 'Excited and curious', isCorrect: true },
      { id: 'c', text: 'Tired and bored', isCorrect: false },
      { id: 'd', text: 'Angry and frustrated', isCorrect: false }
    ],
    hint: 'Look for words that describe Emma\'s reaction to finding something new.',
    explanation: 'Emma whispered "This is extraordinary!" and had always dreamed of finding something magical, showing her excitement and curiosity.',
    type: 'multiple-choice',
    category: 'character',
    pageNumber: 1
  },
  {
    id: 'q2',
    question: 'What does the word "magnificent" mean in the story?',
    options: [
      { id: 'a', text: 'Very small', isCorrect: false },
      { id: 'b', text: 'Very ugly', isCorrect: false },
      { id: 'c', text: 'Very beautiful and impressive', isCorrect: true },
      { id: 'd', text: 'Very scary', isCorrect: false }
    ],
    hint: 'Think about how Emma describes the trees she sees.',
    explanation: 'Magnificent means extremely beautiful or impressive. Emma uses this word to describe the amazing trees in the forest.',
    type: 'multiple-choice',
    category: 'vocabulary',
    pageNumber: 1
  },
  {
    id: 'q3',
    question: 'What happens to Luna before Emma helps her?',
    options: [
      { id: 'a', text: 'She gets lost in the forest', isCorrect: false },
      { id: 'b', text: 'She loses her magic powers', isCorrect: false },
      { id: 'c', text: 'She gets trapped under a fallen leaf', isCorrect: true },
      { id: 'd', text: 'She falls into the stream', isCorrect: false }
    ],
    hint: 'Look for what Emma needs to lift to free the fairy.',
    explanation: 'Luna was trapped under a fallen leaf for hours before Emma gently lifted it to free her.',
    type: 'multiple-choice',
    category: 'plot',
    pageNumber: 2
  }
];

const postReadingQuestions: ComprehensionQuestion[] = [
  {
    id: 'pr1',
    question: 'What is the main theme of this story?',
    options: [
      { id: 'a', text: 'The importance of being afraid', isCorrect: false },
      { id: 'b', text: 'Kindness and helping others leads to rewards', isCorrect: true },
      { id: 'c', text: 'Magic is dangerous and should be avoided', isCorrect: false },
      { id: 'd', text: 'Forests are scary places', isCorrect: false }
    ],
    hint: 'Think about what Emma does for Luna and what happens as a result.',
    explanation: 'Emma\'s kindness in helping Luna leads to her being shown the secret Heart of the Forest, demonstrating that good deeds are rewarded.',
    type: 'multiple-choice',
    category: 'main-idea',
    pageNumber: 0
  },
  {
    id: 'pr2',
    question: 'Put these events in the correct order:',
    options: [
      { id: 'a', text: '1. Emma helps Luna, 2. Emma finds the path, 3. Luna shows Emma the garden, 4. Emma follows the path', isCorrect: false },
      { id: 'b', text: '1. Emma finds the path, 2. Emma follows the path, 3. Emma helps Luna, 4. Luna shows Emma the garden', isCorrect: true },
      { id: 'c', text: '1. Luna shows Emma the garden, 2. Emma finds the path, 3. Emma helps Luna, 4. Emma follows the path', isCorrect: false },
      { id: 'd', text: '1. Emma helps Luna, 2. Luna shows Emma the garden, 3. Emma finds the path, 4. Emma follows the path', isCorrect: false }
    ],
    hint: 'Start with what Emma discovers first in her backyard.',
    explanation: 'The story follows this sequence: Emma discovers the path, follows it into the forest, helps Luna who is trapped, and then Luna rewards her by showing the secret garden.',
    type: 'multiple-choice',
    category: 'sequence',
    pageNumber: 0
  },
  {
    id: 'pr3',
    question: 'Why is Emma allowed to see the Heart of the Forest?',
    options: [
      { id: 'a', text: 'Because she is very smart', isCorrect: false },
      { id: 'b', text: 'Because she has a pure heart and courage', isCorrect: true },
      { id: 'c', text: 'Because she is very strong', isCorrect: false },
      { id: 'd', text: 'Because she found the path first', isCorrect: false }
    ],
    hint: 'Luna explains why only certain people can find this special place.',
    explanation: 'Luna tells Emma that only those with pure hearts and courage can find the Heart of the Forest, which Emma demonstrated through her kindness.',
    type: 'multiple-choice',
    category: 'cause-effect',
    pageNumber: 0
  },
  {
    id: 'pr4',
    question: 'How would you describe Emma\'s character?',
    options: [
      { id: 'a', text: 'Selfish and mean', isCorrect: false },
      { id: 'b', text: 'Kind and adventurous', isCorrect: true },
      { id: 'c', text: 'Lazy and boring', isCorrect: false },
      { id: 'd', text: 'Angry and impatient', isCorrect: false }
    ],
    hint: 'Think about Emma\'s actions and attitude throughout the story.',
    explanation: 'Emma shows kindness by helping Luna and demonstrates an adventurous spirit by exploring the mysterious path and following it into the unknown.',
    type: 'multiple-choice',
    category: 'character',
    pageNumber: 0
  },
  {
    id: 'pr5',
    question: 'What can we predict might happen next in the story?',
    options: [
      { id: 'a', text: 'Emma will never return to the forest', isCorrect: false },
      { id: 'b', text: 'Emma will have more magical adventures with Luna', isCorrect: true },
      { id: 'c', text: 'Emma will become scared of magic', isCorrect: false },
      { id: 'd', text: 'Emma will forget about Luna completely', isCorrect: false }
    ],
    hint: 'Consider the friendship Emma and Luna have formed and the magical world Emma has discovered.',
    explanation: 'Given Emma\'s wonder at the magical world and her new friendship with Luna, it\'s likely they will continue to have adventures together in this enchanted forest.',
    type: 'multiple-choice',
    category: 'prediction',
    pageNumber: 0
  }
];

export const useComprehensionQuestions = (bookId: string) => {
  const [duringReadingQuestions] = useState<ComprehensionQuestion[]>(sampleQuestions);
  const [postReadingQuestions] = useState<ComprehensionQuestion[]>(postReadingQuestions);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());
  const [comprehensionScore, setComprehensionScore] = useState<number>(0);

  const getQuestionsForPage = (pageNumber: number): ComprehensionQuestion[] => {
    return duringReadingQuestions.filter(q => q.pageNumber === pageNumber && !answeredQuestions.has(q.id));
  };

  const markQuestionAnswered = (questionId: string, correct: boolean) => {
    setAnsweredQuestions(prev => new Set([...prev, questionId]));
    if (correct) {
      setComprehensionScore(prev => prev + 1);
    }
  };

  const getPostReadingQuestions = (): ComprehensionQuestion[] => {
    return postReadingQuestions;
  };

  const resetProgress = () => {
    setAnsweredQuestions(new Set());
    setComprehensionScore(0);
  };

  return {
    getQuestionsForPage,
    getPostReadingQuestions,
    markQuestionAnswered,
    answeredQuestions,
    comprehensionScore,
    resetProgress
  };
};

export type { ComprehensionQuestion };
