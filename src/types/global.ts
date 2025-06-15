import type {ComponentType, ReactNode} from "react";

export const GAME_TYPES = {
    MULTIPLICATION: "Multiplication",
    ADDITION: "Addition",
    SUBTRACTION: "Subtraction",
    DIVISION: "Division",
} as const;

export type GameTypeSelection = {
    label: string;
    className: string;
    icon: ReactNode;
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type DifficultyData = {
    id: DifficultyLevel;
    title: string;
    icon: ComponentType;
    color: string;
    description: string;
};

export type ButtonProps = {
    icon?: ReactNode;
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
};

export type DifficultyCardProps = {
    difficulty: DifficultyData;
    isSelected: boolean;
    onSelect: (difficulty: DifficultyData) => void;
};

export type PageHeaderProps = {
    title: string;
    subtitle: string;
};

export type DifficultyGridProps = {
    difficulties: DifficultyData[];
    selectedDifficulty: DifficultyLevel | null;
    onDifficultySelect: (difficulty: DifficultyData) => void;
};

export type StartGameSectionProps = {
    selectedDifficulty: DifficultyLevel | null;
    onStartGame: () => void;
};