import Button from "../../../common/components/button";
import {type Dispatch, type SetStateAction, } from "react";

type AnswerInputProps ={
    setIsRunning:Dispatch<SetStateAction<boolean>>
    setIsAnswered: Dispatch<SetStateAction<boolean>>
    setUserAnswer: Dispatch<SetStateAction<number>>
    userAnswer: number
}

const AnswerInput = ({setIsRunning,setIsAnswered,userAnswer,setUserAnswer}:AnswerInputProps) => {
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log({userAnswer})
        setIsRunning(false);
        setIsAnswered(true)
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white ">
                <div>
                    <label htmlFor="answer" className={"text-sm"}>Answer</label>
                </div>
                <input type={"number"} className={"block w-64 outline-1 rounded-md py-2 focus:outline-white px-3 text-sm"} value={userAnswer}
                       onChange={(e) => setUserAnswer(parseInt(e.target.value))} />
            </div>
            <Button label={"submit"} className={`bg-btn-accent my-5 `}  onClick={handleSubmit}/>
        </form>
    )
}
export default AnswerInput
