export const GAME_TYPES = {
    MULTIPLICATION: "Multiplication",
    ADDITION: "Addition",
    SUBTRACTION: "Subtraction",
    DIVISION: "Division",
} as const;

export type GameTypeSelection = {
    label: string;
    className: string;
    icon: React.ReactNode;
};

