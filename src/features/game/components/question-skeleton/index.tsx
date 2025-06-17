
const QuestionSkeleton = () => {
    return (
        <div>
            <div className="rounded-xl lg:w-[30vw] w-[90vw] lg:h-[25vh] p-10 text-center shadow-2xl space-y-7 bg-gray-200 animate-pulse">
                <div className="h-4 w-20 bg-gray-300 rounded text-left"></div>
                <div className="flex gap-2 justify-center">
                    <div className="h-10 w-24 bg-gray-300 rounded"></div>
                    <div className="h-10 w-8 bg-gray-300 rounded"></div>
                    <div className="h-10 w-16 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    )
}
export default QuestionSkeleton
