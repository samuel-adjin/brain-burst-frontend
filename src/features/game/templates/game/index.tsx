import Timer from "../../components/timer";
import ScoreTracker from "../../components/score-tracker";
import QuestionDisplay from "../../components/question-display";
import UserLife, { TOTAL_LIVES } from "../../components/life";
import { Suspense, useEffect, useState } from "react";
import { generateMathQuestion, type MathQuestion, type Operation } from "../../../../lib/data/questions.ts";
import { useParams } from "react-router-dom";
import { GAME_TYPES } from "../../../../types/global.ts";
import AnswerInput from "../../components/answer-input";
import GameOver from "../../components/game-over";

const GameTemplate = () => {
    const [lives, setLives] = useState(TOTAL_LIVES);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isAnswered, setIsAnswered] = useState(false);
    const { operator, level } = useParams();
    const [operand, setOperand] = useState<Operation>();
    const [question, setQuestion] = useState<MathQuestion | null>(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isRunning, setIsRunning] = useState(true);
    const [keyTrigger, setKeyTrigger] = useState(0);
    const [userAnswer, setUserAnswer] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [hideInput, setHideInput] = useState(false);
    const [correctAnswerTextShow, setCorrectAnswerTextShow] = useState(false);
    const [userTimedOut, setUserTimedOut] = useState(false);
    const [loadedFromStorage, setLoadedFromStorage] = useState(false);

    // Load saved state
    useEffect(() => {
        const saved = localStorage.getItem("game-state");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setQuestionNumber(parsed.questionNumber || 1);
                setScore(parsed.score || 0);
                setLives(parsed.lives ?? TOTAL_LIVES);
                setQuestion(parsed.question || null);
                setUserAnswer(parsed.userAnswer || 0);
                setOperand(parsed.operand || "+");
                setTimeLeft(parsed.timeLeft || 30);
                setLoadedFromStorage(true);
            } catch (e) {
                console.error("Failed to load saved state", e);
                setLoadedFromStorage(true); // fallback to allow game to start
            }
        } else {
            setLoadedFromStorage(true); // allow game to start fresh
        }
    }, []);

    // Save state
    useEffect(() => {
        if (!isGameOver && operand) {
            const state = {
                questionNumber,
                score,
                lives,
                question,
                userAnswer,
                operand,
                level,
                timeLeft,
            };
            localStorage.setItem("game-state", JSON.stringify(state));
        }
    }, [questionNumber, score, lives, question, userAnswer, operand, level, timeLeft, isGameOver]);

    // Clear state when game is over
    useEffect(() => {
        if (isGameOver) {
            localStorage.removeItem("game-state");
        }
    }, [isGameOver]);

    // Determine operand from URL param
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

    // Generate new question only if not restoring
    useEffect(() => {
        if (operand && loadedFromStorage && question === null) {
            const q = generateMathQuestion(1, operand);
            setQuestion(q);
        }
    }, [operand, loadedFromStorage]);

    // Timer handler
    const handleTimeout = () => {
        if (!isAnswered) {
            setIsRunning(false);
            setUserTimedOut(true);
            setIsAnswered(true);
        }
    };

    // Handle answer result and move to next
    useEffect(() => {
        const next = (operand: Operation) => {
            const newNumber = questionNumber + 1;
            setQuestion(generateMathQuestion(newNumber, operand));
            setQuestionNumber(newNumber);
        };

        if (isAnswered && operand) {
            const isCorrect = !userTimedOut && question?.answer === userAnswer;
            setHideInput(true);
            setShowCorrectAnswer(!isCorrect);
            setCorrectAnswerTextShow(isCorrect);

            const timeout = setTimeout(() => {
                if (isCorrect) {
                    setScore((prev) => prev + 10);
                } else {
                    setLives((prev) => {
                        const updated = Math.max(prev - 1, 0);
                        if (updated === 0) {
                            setIsGameOver(true);
                            setIsRunning(false);
                        }
                        return updated;
                    });
                }

                setShowCorrectAnswer(false);
                setCorrectAnswerTextShow(false);
                setKeyTrigger((prev) => prev + 1); // restart timer
                setIsRunning(true);
                setIsAnswered(false);
                setHideInput(false);
                setUserTimedOut(false);
                next(operand);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [isAnswered, question, userAnswer, operand, questionNumber, userTimedOut]);

    return (
        <div className={"mt-5 text-white lg:space-y-32 space-y-20"}>
            <div className={"flex justify-around"}>
                <div>
                    <ScoreTracker score={score} />
                </div>
                <div>
                    <UserLife lives={lives} />
                </div>
                <div>
                    <Timer
                        duration={30}
                        isRunning={isRunning}
                        keyTrigger={keyTrigger}
                        onComplete={handleTimeout}
                        timeLeft={timeLeft}
                        setTimeLeft={setTimeLeft}
                    />
                </div>
            </div>
            <div className={" mx-auto flex flex-col justify-center items-center"}>
                <Suspense fallback={<div>Loading...</div>}>
                    {question && !isGameOver ? (
                        <QuestionDisplay
                            question={question.question}
                            answer={showCorrectAnswer ? question.answer : null}
                            correctAnswerTextShow={correctAnswerTextShow}
                        />
                    ) : (
                        <GameOver score={score} />
                    )}
                </Suspense>
                {!hideInput && !isGameOver && (
                    <div>
                        <AnswerInput
                            setIsAnswered={setIsAnswered}
                            setIsRunning={setIsRunning}
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameTemplate;
