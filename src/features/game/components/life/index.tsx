
import { motion } from "motion/react";
import {Life} from "../../../common/icons/life.tsx";
import {DeadLife} from "../../../common/icons/dead-life.tsx";


export const TOTAL_LIVES = 3;

type UserLifeProps = {
    lives: number
}

export const UserLife = ({lives}:UserLifeProps) => {



    return (
        <div>
            <div className={"space-y-3"}>
                <h1 className={"text-center text-sm"}>Lives</h1>
                <div className={"flex "}>
                    {Array.from(Array(TOTAL_LIVES).keys()).map((_, i) => {
                        const lost = i >= lives
                        return <motion.span
                            className="text-2xl"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{
                                opacity: lost ? 0.3 : 1,
                                x: lost ? [0, -5, 5, -5, 5, 0] : 0,
                            }}
                            transition={{ duration: lost ? 0.5 : 0.3 }}
                            key={i}
                        >
                            {lost ? <DeadLife/> : <Life/>}
                        </motion.span>
                    })}
                </div>
            </div>
        </div>
    )
}
export default UserLife
