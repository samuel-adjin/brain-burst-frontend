import {GAME_TYPES, type GameTypeSelection} from "../../../../types/global.ts";
import Button from "../../../common/components/button";
import {Multiply} from "../../../common/icons/multiply.tsx";
import {Division} from "../../../common/icons/division.tsx";
import {Addition} from "../../../common/icons/addition.tsx";
import {Minus} from "../../../common/icons/minus.tsx";
import {Link} from "react-router-dom";

export const GAME_SELECTION: GameTypeSelection[] = [
    {
        label: GAME_TYPES.MULTIPLICATION,
        className: " bg-btn-accent w-64 py-3 rounded-r-3xl justify-start",
        icon: <Multiply/>,
    },
    {
        label: GAME_TYPES.DIVISION,
        className: "bg-btn-primary w-64 py-3 rounded-r-3xl justify-start",
        icon: <Division/>,
    },
    {
        label: GAME_TYPES.ADDITION,
        className: "bg-[#ff59a7] w-64 py-3 rounded-r-3xl justify-start",
        icon: <Addition/>,
    },
    {
        label: GAME_TYPES.SUBTRACTION,
        className: "bg-btn-secondary w-64 py-3 rounded-r-3xl justify-start",
        icon: <Minus/>,
    },
];

const GameSelectionTemplate = () => {
    return (
        <div className={"content-container-default overflow-y-hidden relative bottom-12"}>
            <div className={" space-y-14 "}>
                <div>
                    <h1 className={"text-white text-2xl"}>Select Mathematical Operator for Game</h1>
                </div>
                <div className={" space-y-7"}>
                    {
                        GAME_SELECTION.map((game) => {
                            return <div key={game.label} className={"space-y-10"}>
                                <Link to={`/games/game/${game.label}`}>
                                    <Button icon={game.icon} label={game.label} className={game.className}/>
                                </Link>
                            </div>
                        })
                    }
                </div>

            </div>
        </div>
    )
}
export default GameSelectionTemplate
