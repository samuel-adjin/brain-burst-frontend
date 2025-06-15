import {useEffect, useRef, type SetStateAction, type Dispatch} from "react";
import {CircleTimer} from "../../../common/icons/circle-timer.tsx";

type TimerProps = {
    duration: number;
    isRunning: boolean;
    onComplete?: () => void;
    keyTrigger?: number;
    timeLeft:number;
    setTimeLeft:  Dispatch<SetStateAction<number>>
};


const Timer = ({duration, isRunning, onComplete, keyTrigger,setTimeLeft,timeLeft}: TimerProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setTimeLeft(duration); // reset when key changes
    }, [duration, keyTrigger]);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        onComplete?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalRef.current!);
    }, [isRunning, timeLeft]);

    const progress = ((duration - timeLeft) / duration) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset =
        circumference - (progress / 100) * circumference;

    return (
        <div className="relative w-10 h-10">
            <CircleTimer strokeDashoffset={strokeDashoffset} strokeDasharray={circumference} />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-md font-bold text-white">{timeLeft}</span>
            </div>
        </div>
    );
}
export default Timer
