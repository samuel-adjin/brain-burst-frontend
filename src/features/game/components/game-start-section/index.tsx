import ActionButton from "../../../common/components/action-button";
import type {StartGameSectionProps} from "../../../../types/global.ts";

const StartGameSection = ({selectedDifficulty, onStartGame}:StartGameSectionProps) => (
    <div className="text-center">
        <ActionButton
            onClick={onStartGame}
            disabled={!selectedDifficulty}
            label="Start Game"
            icon={
               <></>
            }
            className={
                selectedDifficulty
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-blue-300 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
        />

        {!selectedDifficulty && (
            <p className="text-gray-500 mt-4">
                Please select a difficulty level to start playing
            </p>
        )}
    </div>
);

export default StartGameSection