import {EasyIcon} from "../../../common/icons/easy-icon.tsx";
import type {DifficultyData, DifficultyLevel} from "../../../../types/global.ts";
import {useState} from "react";
import {MediumIcon} from "../../../common/icons/medium-icon.tsx";
import {HardIcon} from "../../../common/icons/hard-icon.tsx";
import PageHeader from "../game-level-card-header";
import GameLevelCardGrid from "../game-level-card-grid";
import StartGameSection from "../game-start-section";
import { useNavigate } from 'react-router-dom';
import {useParams} from "react-router-dom";

const GameLevel = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
    const navigate = useNavigate();
    const { operator } = useParams();
    const difficulties: DifficultyData[] = [
        {
            id: 'easy',
            title: 'Easy',
            icon: EasyIcon,
            color: 'from-green-400 to-emerald-500',
            description: 'Numbers ranging from 1 to 20'
        },
        {
            id: 'medium',
            title: 'Medium',
            icon: MediumIcon,
            color: 'from-yellow-400 to-orange-500',
            description: 'Numbers ranging from 21 to 49'
        },
        {
            id: 'hard',
            title: 'Hard',
            icon: HardIcon,
            color: 'from-red-400 to-pink-500',
            description: 'Numbers ranging from 50 to 100'
        }
    ];

    const handleDifficultySelect = (difficulty: DifficultyData): void => {
        setSelectedDifficulty(difficulty.id);
    };

    const handleStartGame = (): void => {
        if (selectedDifficulty) {
            navigate(`/games/game/${operator}/${selectedDifficulty}`)
        }
    };

    return (
        <div className="min-h-screen  to-indigo-100 flex items-center justify-center p-6">
            <div className="w-full max-w-4xl mx-auto">
                <PageHeader
                    title="Choose Difficulty Level"
                    subtitle="Select your preferred challenge level"
                />

                <GameLevelCardGrid
                    difficulties={difficulties}
                    selectedDifficulty={selectedDifficulty}
                    onDifficultySelect={handleDifficultySelect}
                />

                <StartGameSection
                    selectedDifficulty={selectedDifficulty}
                    onStartGame={handleStartGame}
                />
            </div>
        </div>
    );
};
export default GameLevel
