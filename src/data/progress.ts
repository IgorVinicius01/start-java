import { lessons } from "./lessons";

export const STORAGE_KEY = "start-java:progress";

interface StoredProgress {
    lastLessonId: number;
    maxVisitedIndex: number;
}

const defaultProgress: StoredProgress = {
    lastLessonId: lessons[0].id,
    maxVisitedIndex: 0
};

// Lê o progresso salvo no navegador. Se não existir, estiver corrompido,
// ou apontar para uma aula que não existe mais, volta para o início do
// curso em vez de quebrar a aplicação.
export function loadProgress(): StoredProgress {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultProgress;

        const parsed = JSON.parse(raw) as Partial<StoredProgress>;

        const lastLessonIsValid = lessons.some(
            lesson => lesson.id === parsed.lastLessonId
        );

        return {
            lastLessonId: lastLessonIsValid
                ? (parsed.lastLessonId as number)
                : defaultProgress.lastLessonId,
            maxVisitedIndex:
                typeof parsed.maxVisitedIndex === "number"
                    ? parsed.maxVisitedIndex
                    : defaultProgress.maxVisitedIndex
        };
    } catch {
        return defaultProgress;
    }
}

// Salva o progresso. Falha silenciosamente se o localStorage estiver
// indisponível (ex: navegação anônima com bloqueio de armazenamento).
export function saveProgress(progress: StoredProgress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
        // ambiente sem localStorage disponível — segue sem persistir
    }
}
