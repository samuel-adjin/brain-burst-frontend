import {useEffect, useState} from "react";
import {fetchLeaderboard} from "../../../../lib/data/game.tsx";
import Boards from "../boards";
import {Loading} from "../../../common/icons/loading.tsx";

type Difficulty = 'easy' | 'medium' | 'hard';

export interface ScoreEntry {
    score: number;
    user: string;
    timestamp: string; // ISO 8601 format
}

export type Leaderboard = {
    [key in Difficulty]: ScoreEntry[];
};
export const LEVELS:Difficulty[] = ["easy", "medium", "hard"];

const ScoreBoard = () => {
    const[score, setScore] = useState<Leaderboard>();
    useEffect(() => {
        const board = async ()=>{
            const board = await fetchLeaderboard();
            setScore(board);
        }
        board();
    }, []);

    return (
       <div>
           <div className="space-y-5 flex lg:flex-row flex-col justify-around">
               { score ?
                   LEVELS.map((level:Difficulty, index) => {
                       const leaderboard = score ? score[level] : []
                       return <Boards score={leaderboard} level={level} key={index} />
                   }) : <div className={"text-white"}>
                       <Loading size={"40"}/>
                   </div>
               }
           </div>
       </div>

    )
}
export default ScoreBoard
