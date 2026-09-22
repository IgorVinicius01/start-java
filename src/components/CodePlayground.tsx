import { useState } from "react";
import type { CodeChallenge } from "../data/lessons";

interface CodePlaygroundProps {
    challenge: CodeChallenge;
}

function friendlyErrorHint(rawError: string): string | null {
    if (/could not find or load main class/i.test(rawError) || /NoClassDefFoundError/i.test(rawError)) {
        return 'Dica: verifique se a sua classe principal se chama exatamente "Main" (public class Main).';
    }
    if (/error: class .* is public, should be declared in a file named/i.test(rawError)) {
        return 'Dica: uma classe declarada como "public" precisa ter o mesmo nome do arquivo — mantenha "public class Main".';
    }
    return null;
}

function CodePlayground({ challenge }: CodePlaygroundProps) {
    const [code, setCode] = useState(challenge.starterCode);
    const [output, setOutput] = useState<string | null>(null);
    const [errorOutput, setErrorOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleRun() {
        setLoading(true);
        setOutput(null);
        setErrorOutput(null);

        try {
            const response = await fetch("https://ce.judge0.com/submissions?wait=true", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    language_id: 62,
                    source_code: code,
                }),
            });

            if (!response.ok) {
                throw new Error("Erro de comunicação com o servidor de execução.");
            }

            const data = await response.json();

            const stdout = data.stdout ? data.stdout.trim() : "";
            const stderr = data.stderr ? data.stderr.trim() : "";
            const compileOutput = data.compile_output ? data.compile_output.trim() : "";

            if (compileOutput) {
                setErrorOutput(compileOutput);
            } else if (stderr) {
                setErrorOutput(stderr);
            } else if (stdout) {
                setOutput(stdout);
            } else {
                setOutput("(o programa não imprimiu nada)");
            }
        } catch (err) {
            console.error("Erro ao executar código Java:", err);
            const message = err instanceof Error ? err.message : null;
            setErrorOutput(
                message || "Não foi possível conectar ao servidor de execução. Verifique sua conexão com a internet."
            );
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setCode(challenge.starterCode);
        setOutput(null);
        setErrorOutput(null);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        const target = event.currentTarget;
        const { value, selectionStart, selectionEnd } = target;

        if (event.key === "Tab") {
            event.preventDefault();
            const tabSpaces = "    ";

            const newCode =
                value.substring(0, selectionStart) +
                tabSpaces +
                value.substring(selectionEnd);

            setCode(newCode);

            setTimeout(() => {
                target.selectionStart = target.selectionEnd = selectionStart + tabSpaces.length;
            }, 0);
        }

        if (event.key === "Enter") {
            const lineStart = value.lastIndexOf("\n", selectionStart - 1) + 1;
            const currentLine = value.substring(lineStart, selectionStart);

            const match = currentLine.match(/^(\s+)/);

            if (match) {
                event.preventDefault();
                const currentIndent = match[1];

                const extraIndent = currentLine.trim().endsWith("{") ? "    " : "";
                const totalIndent = "\n" + currentIndent + extraIndent;

                const newCode =
                    value.substring(0, selectionStart) +
                    totalIndent +
                    value.substring(selectionEnd);

                setCode(newCode);

                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = selectionStart + totalIndent.length;
                }, 0);
            } else if (currentLine.trim().endsWith("{")) {
                // Se a linha não tinha indentação prévia, mas terminou com '{'
                event.preventDefault();
                const totalIndent = "\n    ";

                const newCode =
                    value.substring(0, selectionStart) +
                    totalIndent +
                    value.substring(selectionEnd);

                setCode(newCode);

                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = selectionStart + totalIndent.length;
                }, 0);
            }
        }
    }

    const errorHint = errorOutput ? friendlyErrorHint(errorOutput) : null;

    return (
        <section className="mt-12 bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3">
                💻 Pratique agora
            </h3>
            <p className="text-gray-300 mb-4">{challenge.instructions}</p>

            <textarea
                value={code}
                onChange={event => setCode(event.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                disabled={loading}
                className="
                    w-full h-64 bg-slate-950 text-gray-100
                    font-mono text-sm p-4 rounded-lg
                    border border-slate-700
                    focus:outline-none focus:border-orange-500
                    disabled:opacity-70
                    resize-y
                "
            />

            <div className="mt-4 flex flex-wrap gap-3">
                <button
                    onClick={handleRun}
                    disabled={loading}
                    className="
                        bg-orange-500 hover:bg-orange-600
                        disabled:opacity-60 disabled:pointer-events-none
                        px-5 py-2.5 rounded-lg font-semibold text-white
                        cursor-pointer transition-all
                    "
                >
                    {loading ? "Executando..." : "▶ Executar Código"}
                </button>
                <button
                    onClick={handleReset}
                    disabled={loading}
                    className="
                        border border-slate-700 hover:bg-slate-800
                        disabled:opacity-60 disabled:pointer-events-none
                        px-5 py-2.5 rounded-lg font-semibold text-white
                        cursor-pointer transition-all
                    "
                >
                    Restaurar código inicial
                </button>
            </div>

            {output !== null && (
                <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-1">Saída:</p>
                    <pre
                        className="
                            p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap
                            bg-slate-950 text-green-400 border border-slate-700
                        "
                    >
                        {output}
                    </pre>
                </div>
            )}

            {errorOutput !== null && (
                <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-1">Erro:</p>
                    <pre
                        className="
                            p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap
                            bg-red-500/10 text-red-400 border border-red-500/30
                        "
                    >
                        {errorOutput}
                    </pre>
                    {errorHint && (
                        <p className="mt-2 text-sm text-orange-400 italic">
                            {errorHint}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}

export default CodePlayground;