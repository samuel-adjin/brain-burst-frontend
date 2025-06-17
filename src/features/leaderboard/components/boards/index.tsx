import Rank from "../rank";
import type {ScoreEntry} from "../score-board";

type BoardsProps ={
    score:ScoreEntry[]
    level:string
}

const Boards = ({score,level}:BoardsProps) => {
    return (
        <div className="space-y-7 lg:w-[20vw] 3 h-[85vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 rounded-md">
            <div className="bg-[#1e293b] p-5 px-10 rounded-md">
                <h1 className="lg:text-md text-lg mb-3 font-bold text-white">Leader board for Level: {level}</h1>
            </div>
            {score && score.map((user,i:number) => (
                <div key={user.user} className="my-3">
                    <Rank username={user.user} score={user.score} position={i+1} />
                </div>
            ))}
        </div>
    )
}
export default Boards
