import { motion,AnimatePresence  } from "motion/react"

type ScoreTrackerProps = {
    score: number
}

const ScoreTracker = ({score}:ScoreTrackerProps) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={score} // re-renders on every score update
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.4, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-green-500"
            >
                {score}
            </motion.div>
        </AnimatePresence>
    )
}
export default ScoreTracker
