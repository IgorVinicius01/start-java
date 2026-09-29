import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Quiz from "../components/Quiz";
import CodePlayground from "../components/CodePlayground";
import { lessons } from "../data/lessons";
import { loadProgress, saveProgress } from "../data/progress";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Content() {

    const navigate = useNavigate();
    const [selectedLesson, setSelectedLesson] = useState(
        () => loadProgress().lastLessonId
    );
    const [maxVisitedIndex, setMaxVisitedIndex] = useState(
        () => loadProgress().maxVisitedIndex
    );
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentIndex = lessons.findIndex(
        lesson => lesson.id === selectedLesson
    );

    const lesson = lessons[currentIndex];
    const isFirstLesson = currentIndex === 0;
    const isLastLesson = currentIndex === lessons.length - 1;

    // Sempre que o aluno chega numa aula mais avançada do que já tinha
    // visitado, isso vira o novo "recorde" de progresso (não regride se
    // ele voltar para revisar uma aula anterior).
    function selectLesson(id: number) {
        setSelectedLesson(id);

        const index = lessons.findIndex(lesson => lesson.id === id);
        if (index === -1) return;

        setMaxVisitedIndex(previous => (index > previous ? index : previous));
    }

    // Persiste a aula atual e o progresso máximo a cada mudança, para que
    // o aluno volte de onde parou ao recarregar a página.
    useEffect(() => {
        saveProgress({ lastLessonId: selectedLesson, maxVisitedIndex });
    }, [selectedLesson, maxVisitedIndex]);

    function goToPreviousLesson() {
        if (!isFirstLesson) {
            selectLesson(lessons[currentIndex - 1].id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    function goToNextLesson() {
        if (!isLastLesson) {
            selectLesson(lessons[currentIndex + 1].id);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    return (
        <div className="flex min-h-screen bg-slate-950">

            <Sidebar
                lessons={lessons}
                selectedLesson={selectedLesson}
                maxVisitedIndex={maxVisitedIndex}
                onSelectLesson={selectLesson}
                onGoHome={() => navigate("/")}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="flex-1 min-w-0 py-4 px-4 sm:px-6 lg:px-10 overflow-y-auto">

                <div className="lg:hidden sticky top-0 z-30 -mx-4 sm:-mx-6 mb-4 flex items-center gap-3 bg-slate-950/95 backdrop-blur border-b border-slate-800 px-4 sm:px-6 py-3">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-300 hover:text-white cursor-pointer p-1"
                        aria-label="Abrir menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold">
                        <span className="text-white">Start</span>{" "}
                        <span className="text-orange-500">Java</span>
                    </span>
                </div>

                <div className="max-w-4xl mx-auto w-full">

                    <header
                        className="
                            h-16
                            border-b
                            border-slate-800
                            flex
                            items-center
                            justify-end
                            px-2 sm:px-6 mb-4
                        "
                    >
                        <span className="text-gray-400 text-sm sm:text-base">
                            Capítulo {currentIndex + 1} de {lessons.length}
                        </span>
                    </header>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8">
                        {lesson?.title}
                    </h1>

                    <div className="text-gray-300 leading-relaxed">
                        <div
                            className="
                                markdown-content
                                text-gray-300 leading-8 text-base sm:text-lg"
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

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:justify-between">
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
                                order-2 sm:order-1
                            "
                        >
                            ← Aula Anterior
                        </button>

                        <button
                            onClick={goToNextLesson}
                            disabled={isLastLesson}
                            className="
                                bg-orange-700
                                hover:bg-orange-800
                                px-6
                                py-3
                                rounded-xl
                                font-semibold
                                text-white
                                cursor-pointer
                                transition-all
                                disabled:opacity-40
                                disabled:pointer-events-none
                                order-1 sm:order-2
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
