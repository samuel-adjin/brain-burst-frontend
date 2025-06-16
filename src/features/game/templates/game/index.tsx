import Timer from "../../components/timer";
import ScoreTracker from "../../components/score-tracker";
import QuestionDisplay from "../../components/question-display";
import UserLife, {TOTAL_LIVES} from "../../components/life";
import {Suspense, useCallback, useEffect, useState} from "react";
import {type Operation} from "../../../../lib/data/questions.ts";
import {useParams} from "react-router-dom";
import AnswerInput from "../../components/answer-input";
import GameOver from "../../components/game-over";
import {fetchGame, setUserScore} from "../../../../lib/data/game.tsx";

type GameQuestion = {
    question: string,
    answer: number,
    level: string,
    operation: Operation
}

type SavedGameState = {
    questionNumber: number;
    score: number;
    lives: number;
    timeLeft: number;
    operator: string;
    level: string;
    question: GameQuestion | null;
}

const STORAGE_KEY = "math-game-state";

const GameTemplate = () => {
    const [lives, setLives] = useState(TOTAL_LIVES);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isAnswered, setIsAnswered] = useState(false);
    const {operator, level} = useParams();
    const [question, setQuestion] = useState<GameQuestion | null>(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [isRunning, setIsRunning] = useState(true);
    const [keyTrigger, setKeyTrigger] = useState(0);
    const [userAnswer, setUserAnswer] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [hideInput, setHideInput] = useState(false);
    const [correctAnswerTextShow, setCorrectAnswerTextShow] = useState(false);
    const [userTimedOut, setUserTimedOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const loadSavedState = () => {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved && operator && level) {
                    const parsedState: SavedGameState = JSON.parse(saved);

                    if (parsedState.operator === operator && parsedState.level === level) {
                        setQuestionNumber(parsedState.questionNumber);
                        setScore(parsedState.score);
                        setLives(parsedState.lives);
                        setTimeLeft(parsedState.timeLeft);
                        setQuestion(parsedState.question);
                    }
                }
            } catch (error) {
                console.error('Failed to load saved state:', error);
                localStorage.removeItem(STORAGE_KEY);
            }
            setHasInitialized(true);
        };

        if (operator && level) {
            loadSavedState();
        }
    }, [operator, level]);

    useEffect(() => {
        if (hasInitialized && operator && level && !isGameOver) {
            const stateToSave: SavedGameState = {
                questionNumber,
                score,
                lives,
                timeLeft,
                operator,
                level,
                question
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
        }
    }, [hasInitialized, questionNumber, score, lives, timeLeft, question, operator, level, isGameOver]);

    useEffect(() => {
        const saveScore = async ()=>{
            if (isGameOver) {
                localStorage.removeItem(STORAGE_KEY);
                await setUserScore(score,level ?? "")
            }
        }
        saveScore();
    }, [isGameOver, score]);

    const fetchNewQuestion = useCallback(async () => {
        if (!operator || !level) return;

        setIsLoading(true);
        try {
            const gameQuestion = await fetchGame(level, operator.toLowerCase());
            setQuestion(gameQuestion);
        } catch (error) {
            console.error('Failed to fetch question:', error);
        } finally {
            setIsLoading(false);
        }
    }, [operator, level]);

    useEffect(() => {
        if (hasInitialized && operator && level && !question && !isLoading && !isGameOver) {
            fetchNewQuestion();
        }
    }, [hasInitialized, operator, level, question, isLoading, isGameOver, fetchNewQuestion]);

    const handleTimeout = () => {
        if (!isAnswered) {
            setIsRunning(false);
            setUserTimedOut(true);
            setIsAnswered(true);
        }
    };

    useEffect(() => {
        if (!isAnswered || !question) return;
        const isCorrect = !userTimedOut && question.answer === userAnswer;
        setHideInput(true);
        setShowCorrectAnswer(!isCorrect);
        setCorrectAnswerTextShow(isCorrect);

        const timeout = setTimeout(async () => {
            // Update score and lives
            if (isCorrect) {
                setScore(prev => {
                    return prev + 10;
                });
            } else {
                setLives(prev => {
                    const updated = Math.max(prev - 1, 0);
                    if (updated === 0) {
                        setIsGameOver(true);
                        setIsRunning(false);
                        return updated;
                    }
                    return updated;
                });
            }

            if (lives > 1 || isCorrect) {
                setShowCorrectAnswer(false);
                setCorrectAnswerTextShow(false);
                setHideInput(false);
                setUserTimedOut(false);
                setIsAnswered(false);
                setUserAnswer(0);
                setTimeLeft(30);
                setKeyTrigger(prev => prev + 1);
                setIsRunning(true);
                setQuestionNumber(prev => {
                    return prev + 1;
                });
                setQuestion(null);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, [isAnswered, question, userAnswer, userTimedOut, lives]);

    useEffect(() => {
        if (hasInitialized && !question && !isLoading && !isGameOver && questionNumber > 1) {
            fetchNewQuestion();
        }
    }, [question, hasInitialized, isLoading, isGameOver, questionNumber, fetchNewQuestion]);

    if (!hasInitialized) {
        return (
            <div className={"mt-5 text-white"}>
                <div className={"mx-auto flex flex-col justify-center items-center"}>
                    <div>Initializing game...</div>
                </div>
            </div>
        );
    }

    if (isGameOver) {
        return (
            <div className={"mt-5 text-white"}>
                <div className={"mx-auto flex flex-col justify-center items-center"}>
                    <GameOver score={score}/>
                </div>
            </div>
        );
    }

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
            <div className={"mx-auto flex flex-col justify-center items-center"}>
                <Suspense fallback={<div>Loading...</div>}>
                    {isLoading ? (
                        <div>Loading question...</div>
                    ) : question ? (
                        <QuestionDisplay
                            question={question.question}
                            answer={showCorrectAnswer ? question.answer : null}
                            correctAnswerTextShow={correctAnswerTextShow}
                            questionNumber={questionNumber}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
                </Suspense>
                {!hideInput && question && (
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