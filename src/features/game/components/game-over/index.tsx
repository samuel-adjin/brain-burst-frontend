import Button from "../../../common/components/button";
import {Target} from "../../../common/icons/target.tsx";
import {Home} from "../../../common/icons/home.tsx";
import {Refresh} from "../../../common/icons/refresh.tsx";
import {Link} from "react-router-dom";

type GameOverProps = {
    score: number;
}

const GameOver = ({score}:GameOverProps) => {
    const handleRestart = () => {
        localStorage.removeItem("game-state"); // optional
        window.location.reload();
    };
    return (
        <div className={" border-2 border-gray-500 rounded-lg p-7 bg-white text-center text-black lg:w-[40vw] w-full "}>
            <div className={"space-y-10"}>
                <h1 className={"lg:text-5xl text-3xl font-bold my-3"}>Game Over</h1>
                <div className={"flex justify-center items-center gap-2"}>
                    <h1 className={"text-xl"}>Great Job</h1>
                    <Target className={"text-red-500"}/>
                </div>
                <div>
                    <h1 className={"text-4xl font-bold text-btn-accent"}>{score}</h1>
                    <h1 className={" font-light"}>Final Score</h1>
                </div>
                <div className={"space-y-4 flex gap-10 justify-center "}>
                    <Button label={"Play Again"} className={"bg-btn-primary w-64 py-5 rounded-r-3xl justify-center"} icon={<Refresh/>} onClick={handleRestart}/>
                    <Link to={"/games/selection"}>
                        <Button label={"Main Menu"} className={"bg-btn-secondary w-64 py-5 rounded-r-3xl justify-center"} icon={<Home/>}/>
                    </Link>
                </div>

            </div>
        </div>
    )
}
export default GameOver
