import { CheckCircle2, ChevronLeft, GraduationCap, X } from "lucide-react";
import type { Lesson } from "../data/lessons";

interface SidebarProps {
    lessons: Lesson[];
    selectedLesson: number;
    onSelectLesson: (id: number) => void;
    onGoHome?: () => void;
    isOpen?: boolean;
    onClose?: () => void;
    maxVisitedIndex?: number;
}

function Sidebar({
    lessons,
    selectedLesson,
    onSelectLesson,
    onGoHome,
    isOpen = false,
    onClose,
    maxVisitedIndex
}: SidebarProps) {

    const currentIndex = lessons.findIndex(
        lesson => lesson.id === selectedLesson
    );
    const furthestIndex = maxVisitedIndex ?? currentIndex;
    const progress =
        lessons.length > 0 ? ((currentIndex + 1) / lessons.length) * 100 : 0;

    function handleSelect(id: number) {
        onSelectLesson(id);
        onClose?.();
    }

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen w-72
                    flex flex-col bg-slate-900 border-r border-slate-800
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:sticky lg:translate-x-0
                `}
            >
                <div
                    className={`shrink-0 flex items-center justify-between gap-2 px-6 py-6 ${
                        onGoHome ? "cursor-pointer" : ""
                    }`}
                    onClick={onGoHome}
                >
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-7 h-7 text-orange-500 shrink-0" />
                        <h2 className="text-2xl font-bold leading-none">
                            <span className="text-white">Start</span>{" "}
                            <span className="text-orange-500">Java</span>
                        </h2>
                    </div>

                    <button
                        onClick={event => {
                            event.stopPropagation();
                            onClose?.();
                        }}
                        className="lg:hidden text-gray-400 hover:text-white cursor-pointer p-1"
                        aria-label="Fechar menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="shrink-0 px-6 pb-5">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>
                            Aula {currentIndex + 1} de {lessons.length}
                        </span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div
                            className="h-full rounded-full bg-orange-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 pb-4">
                    <ul className="flex flex-col gap-1">
                        {lessons.map((lesson, index) => {
                            const isActive = lesson.id === selectedLesson;
                            const isDone = index < furthestIndex;

                            return (
                                <li key={lesson.id}>
                                    <button
                                        onClick={() => handleSelect(lesson.id)}
                                        className={`
                                            w-full flex items-center gap-3
                                            rounded-lg px-3 py-3
                                            text-left text-sm
                                            cursor-pointer
                                            transition-colors
                                            ${
                                                isActive
                                                    ? "bg-orange-700 text-white font-semibold"
                                                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                flex items-center justify-center shrink-0
                                                w-6 h-6 rounded-full
                                                text-[11px] font-semibold
                                                ${
                                                    isActive
                                                        ? "bg-black/20 text-white"
                                                        : isDone
                                                        ? "bg-orange-500/15 text-orange-400"
                                                        : "bg-slate-800 text-gray-400"
                                                }
                                            `}
                                        >
                                            {isDone && !isActive ? (
                                                <CheckCircle2 className="w-4 h-4" />
                                            ) : (
                                                index + 1
                                            )}
                                        </span>
                                        <span className="truncate">{lesson.title}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {onGoHome && (
                    <button
                        onClick={onGoHome}
                        className="
                            shrink-0 flex items-center gap-2
                            px-6 py-4 border-t border-slate-800
                            text-sm text-gray-400
                            cursor-pointer
                            transition-colors
                            hover:bg-slate-800 hover:text-white
                        "
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Voltar para o início
                    </button>
                )}
            </aside>
        </>
    );
}

export default Sidebar;
