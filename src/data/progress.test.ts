import { describe, it, expect, beforeEach, vi } from "vitest";

import { lessons } from "./lessons";
import { loadProgress, saveProgress, STORAGE_KEY } from "./progress";

describe("progress", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("retorna o progresso padrão (primeira aula, índice 0) quando nada foi salvo ainda", () => {
        const progress = loadProgress();

        expect(progress.lastLessonId).toBe(lessons[0].id);
        expect(progress.maxVisitedIndex).toBe(0);
    });

    it("recupera exatamente o que foi salvo (round-trip)", () => {
        saveProgress({ lastLessonId: lessons[2].id, maxVisitedIndex: 2 });

        const progress = loadProgress();

        expect(progress.lastLessonId).toBe(lessons[2].id);
        expect(progress.maxVisitedIndex).toBe(2);
    });

    it("ignora um lastLessonId salvo que não existe mais na lista de aulas", () => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ lastLessonId: 999999, maxVisitedIndex: 3 })
        );

        const progress = loadProgress();

        // a aula inválida não pode travar o app: volta para a primeira aula
        expect(progress.lastLessonId).toBe(lessons[0].id);
        // mas um dado válido junto não precisa ser descartado
        expect(progress.maxVisitedIndex).toBe(3);
    });

    it("não quebra e volta ao padrão se o conteúdo salvo não for um JSON válido", () => {
        localStorage.setItem(STORAGE_KEY, "isso não é um JSON{{{");

        expect(() => loadProgress()).not.toThrow();

        const progress = loadProgress();
        expect(progress.lastLessonId).toBe(lessons[0].id);
        expect(progress.maxVisitedIndex).toBe(0);
    });

    it("não lança erro se o localStorage estiver indisponível ao salvar", () => {
        const setItemSpy = vi
            .spyOn(Storage.prototype, "setItem")
            .mockImplementation(() => {
                throw new Error("armazenamento bloqueado (modo anônimo)");
            });

        expect(() =>
            saveProgress({ lastLessonId: lessons[0].id, maxVisitedIndex: 0 })
        ).not.toThrow();

        setItemSpy.mockRestore();
    });
});
