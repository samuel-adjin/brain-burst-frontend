type QuestionProps = {
    question: string,
    answer?: number | null,
    correctAnswerTextShow: boolean
    questionNumber:number
}

const QuestionDisplay = ({question, answer,correctAnswerTextShow,questionNumber}: QuestionProps) => {

    return (
        <div>
            {answer && <h1 className={"text-red-600 text-2xl text-center my-5 font-extrabold"}>WRONG ANSWER</h1>}
            {correctAnswerTextShow && <h1 className={"text-green-800 text-2xl text-center my-5 font-extrabold"}>CORRECT ANSWER</h1>}
            <div
                className={`rounded-xl lg:w-[30vw] w-[90vw] lg:h-[25vh] p-10 text-center shadow-2xl space-y-7 ${answer && "bg-red-600"} ${correctAnswerTextShow ? "bg-green-800" : "bg-primary-light"}`}>
                <h1 className={"text-sm text-left"}>Question {questionNumber}</h1>
                <div className={"flex gap-2 justify-center"}>
                    <div className={"text-4xl font-bold"}>{question.split("=")[0]}</div>
                    {answer && <div className={"text-4xl font-bold"}>= {answer}</div>}
                </div>
            </div>
        </div>
    )
}
export default QuestionDisplay
