
export type User = {
    username: string
    score: number
    position: number
}

const Rank = ({ username, position, score}: User) => {
    const borderStyle = (position: number) => {
        if (position == 1) {
            return "bg-slate-800 border border-yellow-900";
        } else if (position == 2) {
            return "bg-slate-800 border border-slate-700";
        } else if (position == 3) {
            return "bg-slate-800 border border-orange-900";
        } else {
            return "bg-slate-800 border border-slate-700";
        }
    };

    const rankStyle = (position: number) => {
        if (position == 1) {
            return "bg-yellow-500";
        } else if (position == 2) {
            return "bg-slate-400";
        } else if (position == 3) {
            return "bg-orange-400";
        } else {
            return "bg-indigo-400";
        }
    };
    return (
        <div
            className={` p-3 rounded-md flex items-center gap-3 transition-all ${borderStyle(
                position
            )}`}
        >
            <div
                className={`w-7 h-7 flex items-center justify-center rounded-full mr-3 font-bold text-slate-900 ${rankStyle(
                    position
                )}`}
            >
                {position}
            </div>
            <div >
                <div className="flex-grow">
                    <div className="font-medium text-md truncate text-white">{username}</div>
                    <div className="text-sm text-slate-400">Score: {score}</div>
                </div>
            </div>
        </div>
    );
};

export default Rank;