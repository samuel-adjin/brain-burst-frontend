import Timer from "../../components/timer";
import ScoreTracker from "../../components/score-tracker";
import QuestionDisplay from "../../components/question-display";
import UserLife, {TOTAL_LIVES} from "../../components/life";
import {Suspense, useEffect, useState} from "react";
import Button from "../../../common/components/button";
import {generateMathQuestion, type MathQuestion, type Operation} from "../../../../lib/data/questions.ts";
import {useParams} from "react-router-dom";
import {GAME_TYPES} from "../../../../types/global.ts";


const GameTemplate = () => {
    const [lives, setLives] = useState(TOTAL_LIVES);
    const [score, setScore] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(1);
    const { operator } = useParams();
    const [operand, setOperand] = useState<Operation>();
    const [question, setQuestion] = useState<MathQuestion | null>(null);

    useEffect(() => {

        switch (operator) {
            case GAME_TYPES.ADDITION:
                setOperand("+");
                break;
            case GAME_TYPES.SUBTRACTION:
                setOperand("-");
                break;
            case GAME_TYPES.MULTIPLICATION:
                setOperand("*");
                break;
            case GAME_TYPES.DIVISION:
                setOperand("/");
                break;
            default:
                throw new Error("Unsupported operator");
        }
    }, [operator]);

    useEffect(() => {
        if (operand) {
            const q = generateMathQuestion(1, operand);
            setQuestion(q);
        }
    }, [operand]);


    const next = () => {
        const newNumber = questionNumber + 1;
        setQuestion(generateMathQuestion(newNumber,"+"));
        setQuestionNumber(newNumber);
    };


    const handleCorrectAnswer = () => {
        setScore((prev) => prev + 10);
    };

    const handleWrongAnswer = () => {
        setLives((prev) => Math.max(prev - 1, 0));
    };

    return (
        <div className={"mt-5 text-white lg:space-y-32 space-y-20"}>
            <div className={"flex justify-around"}>
                <div>
                    <ScoreTracker score={score}/>
                </div>
                <div>
                    <UserLife lives={lives}/>
                </div>
                <div>
                    <Timer duration={30} isRunning={true}/>
                </div>
            </div>
            <div className={" mx-auto flex flex-col justify-center items-center"}>
                <Suspense fallback={<div>Loading...</div>}>
                    {question && <QuestionDisplay question={question.question}/>}
                </Suspense>
                <div className={""}>
                    <form>
                        <div className="flex flex-col justify-between items-start gap-2 mt-2 text-white ">
                            <div>
                                <label htmlFor="answer" className={"text-sm"}>Answer</label>
                            </div>
                            <input type={"number"} className={"block w-64 outline-1 rounded-md py-2 focus:outline-white px-3 text-sm"}/>
                        </div>
                        <Button label={"submit"} className={" bg-btn-accent my-5"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default GameTemplate
