import type { Lesson } from "../data/lessons";

interface SidebarProps {
    lessons: Lesson[];
    selectedLesson: number;
    onSelectLesson: (id: number) => void;
    onGoHome?: () => void;
}

function Sidebar({
    lessons,
    selectedLesson,
    onSelectLesson,
    onGoHome
}: SidebarProps) {

    return (
        <aside className="w-72 bg-slate-900 border-r border-slate-800">
            <div
                className={`p-6 ${onGoHome ? "cursor-pointer" : ""}`}
                onClick={onGoHome}
            >
                <h2 className="text-4xl font-bold">
                    <span className="text-white">Start</span>{" "}
                    <span className="text-orange-500">Java</span>
                </h2>
            </div>

            <ul>
                {lessons.map((lesson) => (
                    <li
                        key={lesson.id}
                        onClick={() => onSelectLesson(lesson.id)}
                        className={`
                            cursor-pointer
                            px-6 py-4
                            transition
                            hover:bg-slate-800
                            ${
                                selectedLesson === lesson.id
                                    ? "bg-orange-500 text-white"
                                    : "text-gray-300"
                            }
                        `}
                    >
                        {lesson.title}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;