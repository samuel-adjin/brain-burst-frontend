import Rank from "../rank";
import type {ScoreEntry} from "../score-board";

type BoardsProps ={
    score:ScoreEntry[]
    level:string
}

const Boards = ({score,level}:BoardsProps) => {
    return (
     <div>
         <div className="bg-[#1e293b] p-5 px-10 rounded-md">
             <h1 className="lg:text-md text-lg  font-bold text-white">Leader board for Level: {level}</h1>
         </div>
         <div className="space-y-7 mt-10 lg:w-[20vw] 3 h-[70vh] overflow-y-auto overflow-x-hidden scrollbar rounded-md

         ">
             {score && score.map((user,i:number) => (
                 <div key={`${user.user}-${i}`} className="my-3">
                     <Rank username={user.user} score={user.score} position={i+1} />
                 </div>
             ))}
         </div>
     </div>
    )
}
export default Boards
