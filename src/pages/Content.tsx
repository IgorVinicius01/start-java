import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Quiz from "../components/Quiz";
import CodePlayground from "../components/CodePlayground";
import { lessons } from "../data/lessons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Content() {

    const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState(1);

    const currentIndex = lessons.findIndex(
        lesson => lesson.id === selectedLesson
    );

    const lesson = lessons[currentIndex];
    const isFirstLesson = currentIndex === 0;
    const isLastLesson = currentIndex === lessons.length - 1;

    function goToPreviousLesson() {
        if (!isFirstLesson) {
            setSelectedLesson(lessons[currentIndex - 1].id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function goToNextLesson() {
        if (!isLastLesson) {
            setSelectedLesson(lessons[currentIndex + 1].id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar
                lessons={lessons}
                selectedLesson={selectedLesson}
                onSelectLesson={setSelectedLesson}
                onGoHome={() => navigate("/")}
            />

            <main 
                className="flex-1 py-4 px-10 overflow-y-auto">
    
                <div className="max-w-4xl mx-auto w-full">

                    <header
                        className="
                            h-16
                            border-b
                            border-slate-800
                            flex
                            items-center
                            justify-end
                            px-6 mb-4
                        "
                    >
                        <span className="text-gray-400">
                            Capítulo {currentIndex + 1} de {lessons.length}
                        </span>
                    </header>

                    <h1 className="text-4xl font-bold text-white mb-8">
                        {lesson?.title}
                    </h1>

                    <div className="text-gray-300 leading-relaxed">
                        <div 
                            className="
                                markdown-content
                                text-gray-300 leading-8 text-lg"
                        >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {lesson?.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {lesson?.challenge && (
                        <CodePlayground
                            key={`challenge-${lesson.id}`}
                            challenge={lesson.challenge}
                        />
                    )}

                    {lesson?.quiz && lesson.quiz.length > 0 && (
                        <Quiz key={`quiz-${lesson.id}`} questions={lesson.quiz} />
                    )}

                    <div className="mt-12 flex justify-between">
                        <button
                            onClick={goToPreviousLesson}
                            disabled={isFirstLesson}
                            className="
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                text-white
                                cursor-pointer
                                border
                                border-slate-700
                                transition-all
                                hover:bg-slate-800
                                disabled:opacity-0
                                disabled:pointer-events-none
                            "
                        >
                            ← Aula Anterior
                        </button>

                        <button
                            onClick={goToNextLesson}
                            disabled={isLastLesson}
                            className="
                                bg-orange-500
                                hover:bg-orange-600
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                text-white
                                cursor-pointer
                                transition-all
                                disabled:opacity-40
                                disabled:pointer-events-none
                            "
                        >
                            {isLastLesson ? "Última Aula" : "Próxima Aula →"}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Content;