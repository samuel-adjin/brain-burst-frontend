import type {DifficultyCardProps} from "../../../../types/global.ts";
import {SelectionMarkIcon} from "../../../common/icons/selection-mark.tsx";


const GameLevelCard = ({difficulty, isSelected, onSelect}: DifficultyCardProps) => {
    const IconComponent = difficulty.icon;

    const handleClick = (): void => {
        onSelect(difficulty);
    };

    return (
        <div
            className={`
        relative cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isSelected ? 'scale-105 -translate-y-2' : ''}
      `}
            onClick={handleClick}
        >
            <div className={`
        bg-white rounded-3xl p-8 shadow-lg border-4 transition-all duration-300
        ${isSelected
                ? 'border-blue-400 shadow-2xl shadow-blue-200'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-xl'
            }
      `}>
                {isSelected && (
                    <div
                        className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                        <SelectionMarkIcon/>
                    </div>
                )}

                <div className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-r ${difficulty.color} rounded-full p-4`}>
                    <IconComponent/>
                </div>

                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        {difficulty.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                        {difficulty.description}
                    </p>
                </div>
                <div className={`
          absolute inset-0 bg-gradient-to-r ${difficulty.color} opacity-0 rounded-3xl transition-opacity duration-300
          ${isSelected ? 'opacity-5' : 'hover:opacity-5'}
        `}></div>
            </div>
        </div>
    );
}
export default GameLevelCard;

