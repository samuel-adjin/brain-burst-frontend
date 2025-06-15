import type {DifficultyGridProps} from "../../../../types/global.ts";
import GameLevelCard from "../game-level-card";


const GameLevelCardGrid = ({ difficulties, selectedDifficulty, onDifficultySelect }:DifficultyGridProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {difficulties.map((difficulty) => (
                <GameLevelCard
                    key={difficulty.id}
                    difficulty={difficulty}
                    isSelected={selectedDifficulty === difficulty.id}
                    onSelect={onDifficultySelect}
                />
            ))}
        </div>
    )
}
export default GameLevelCardGrid
