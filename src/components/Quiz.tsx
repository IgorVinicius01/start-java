import { useState } from "react";
import type { QuizQuestion } from "../data/lessons";

interface QuizProps {
    questions: QuizQuestion[];
}

function Quiz({ questions }: QuizProps) {

    const [answers, setAnswers] = useState<number[]>(
        Array(questions.length).fill(-1)
    );
    const [submitted, setSubmitted] = useState(false);

    function selectAnswer(questionIndex: number, optionIndex: number) {
        if (submitted) return;
        const updated = [...answers];
        updated[questionIndex] = optionIndex;
        setAnswers(updated);
    }

    function handleReset() {
        setAnswers(Array(questions.length).fill(-1));
        setSubmitted(false);
    }

    const allAnswered = answers.every(answer => answer !== -1);
    const correctCount = answers.filter(
        (answer, index) => answer === questions[index].correctIndex
    ).length;

    return (
        <section className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">
                📝 Teste seu conhecimento
            </h3>

            <div className="flex flex-col gap-8">
                {questions.map((question, questionIndex) => {
                    const selected = answers[questionIndex];

                    return (
                        <div key={questionIndex}>
                            <p className="text-gray-200 font-medium mb-3">
                                {questionIndex + 1}. {question.question}
                            </p>

                            <div className="flex flex-col gap-2">
                                {question.options.map((option, optionIndex) => {
                                    let optionStyle =
                                        "border-slate-700 hover:bg-slate-800";

                                    if (submitted) {
                                        if (optionIndex === question.correctIndex) {
                                            optionStyle =
                                                "border-green-500 bg-green-500/10 text-green-400";
                                        } else if (optionIndex === selected) {
                                            optionStyle =
                                                "border-red-500 bg-red-500/10 text-red-400";
                                        } else {
                                            optionStyle =
                                                "border-slate-800 opacity-50";
                                        }
                                    } else if (selected === optionIndex) {
                                        optionStyle =
                                            "border-orange-500 bg-orange-500/10 text-white";
                                    }

                                    return (
                                        <button
                                            key={optionIndex}
                                            onClick={() =>
                                                selectAnswer(questionIndex, optionIndex)
                                            }
                                            disabled={submitted}
                                            className={`
                                                text-left px-4 py-3 rounded-lg border
                                                transition-all cursor-pointer
                                                text-gray-300
                                                ${optionStyle}
                                            `}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {submitted && question.explanation && (
                                <p className="mt-2 text-sm text-gray-400 italic">
                                    💡 {question.explanation}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex items-center gap-4">
                {!submitted ? (
                    <button
                        onClick={() => setSubmitted(true)}
                        disabled={!allAnswered}
                        className="
                            bg-orange-500 hover:bg-orange-600
                            disabled:opacity-40 disabled:pointer-events-none
                            px-5 py-2.5 rounded-lg font-semibold text-white
                            cursor-pointer transition-all
                        "
                    >
                        Verificar respostas
                    </button>
                ) : (
                    <>
                        <span className="text-gray-300">
                            Você acertou{" "}
                            <strong className="text-white">{correctCount}</strong> de{" "}
                            {questions.length}
                        </span>
                        <button
                            onClick={handleReset}
                            className="
                                border border-slate-700 hover:bg-slate-800
                                px-5 py-2.5 rounded-lg font-semibold text-white
                                cursor-pointer transition-all
                            "
                        >
                            Tentar novamente
                        </button>
                    </>
                )}
            </div>
        </section>
    );
}

export default Quiz;
