import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();
    
    return (
        <div
            className="
                min-h-screen bg-slate-950 
                flex flex-col items-center 
                justify-center"
        >
            <h1 
                className="text-6xl font-bold"
            >
                <span className="text-white">Start</span>{" "}
                <span className="text-orange-500">Java</span>
            </h1>

            <p 
                className="
                    mt-4 text-lg text-gray-400
                    md:text-lg 
                    text-muted-foreground 
                    max-w-xl"
            >
                Aprenda java do zero
            </p>

            <button
                onClick={() => navigate("/content")}
                className="
                    mt-10 px-12 py-4 font-bold
                    bg-orange-500 rounded-xl
                    text-white text-xl cursor-pointer
                    transition-all hover:scale-105 active:scale-95"
            >
                Start
            </button>
        </div>
    )
}

export default Home;