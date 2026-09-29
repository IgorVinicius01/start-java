import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 flex items-center px-6">
            <div className="max-w-xl mx-auto w-full py-20">

                <p className="font-mono text-sm text-slate-400 mb-4">
                    {"// primeiros passos em Java"}
                </p>

                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                    <span className="text-white">Start</span>{" "}
                    <span className="text-orange-500">Java</span>
                </h1>

                <p className="mt-5 text-gray-400 text-lg max-w-md">
                    Um jeito direto de aprender a programar em Java: você lê,
                    resolve e executa o código de verdade, sem precisar
                    instalar nada.
                </p>

                <button
                    onClick={() => navigate("/content")}
                    className="
                        mt-10 inline-flex items-center
                        px-6 py-3 font-semibold
                        bg-orange-700 hover:bg-orange-800
                        rounded-xl text-white
                        cursor-pointer transition-all
                    "
                >
                    Start
                </button>

                <p className="mt-8 font-mono text-xs text-slate-400">
                    10 aulas · quizzes com feedback · compilador Java real
                </p>

            </div>
        </div>
    );
}

export default Home;
