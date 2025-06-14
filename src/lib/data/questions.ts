// lib/mathQuestionGenerator.ts
export type Operation = "+" | "-" | "*" | "/" | "%";

export type MathQuestion = {
    question: string;
    answer: number;
};

function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRange(questionNumber: number): [number, number] {
    if (questionNumber <= 5) return [1, 20];
    if (questionNumber <= 10) return [10, 50];
    if (questionNumber <= 15) return [20, 100];
    return [30, 200];
}

export function generateMathQuestion(
    questionNumber: number,
    operator: Operation
): MathQuestion {
    const [min, max] = getRange(questionNumber);

    let a = getRandomInt(min, max);
    let b = getRandomInt(min, max);
    let answer: number;
    let question: string;

    switch (operator) {
        case "+":
            answer = a + b;
            question = `${a} + ${b}`;
            break;
        case "-":
            answer = a - b;
            question = `${a} - ${b}`;
            break;
        case "*":
            answer = a * b;
            question = `${a} × ${b}`;
            break;
        case "/":
            b = getRandomInt(1, 10);
            answer = Math.floor(a / b);
            a = answer * b;
            question = `${a} ÷ ${b}`;
            break;
        case "%":
            b = getRandomInt(2, 10);
            answer = a % b;
            question = `${a} % ${b}`;
            break;
        default:
            throw new Error("Unsupported operator");
    }

    return {
        question,
        answer,
    };
}
