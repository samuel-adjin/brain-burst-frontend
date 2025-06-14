
type QuestionProps ={
    question:string
}

const QuestionDisplay = ({question}:QuestionProps) => {

    return (
        <div>
            <div className={"rounded-xl lg:w-[30vw] w-[90vw] lg:h-[25vh] p-10 text-center shadow-2xl bg-primary-light space-y-7"}>
                <h1>Question 1</h1>
                <div>
                    <h1 className={"text-4xl font-bold"}>{question}</h1>
                </div>
            </div>
        </div>
    )
}
export default QuestionDisplay
