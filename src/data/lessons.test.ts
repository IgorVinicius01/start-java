import { describe, it, expect } from "vitest";

import { lessons } from "./lessons";

describe("lessons (integridade do conteúdo)", () => {
    it("tem pelo menos uma aula", () => {
        expect(lessons.length).toBeGreaterThan(0);
    });

    it("não tem ids de aula duplicados", () => {
        const ids = lessons.map(lesson => lesson.id);
        const uniqueIds = new Set(ids);

        expect(uniqueIds.size).toBe(ids.length);
    });

    it("toda aula tem título e conteúdo não vazios", () => {
        lessons.forEach(lesson => {
            expect(lesson.title.trim().length).toBeGreaterThan(0);
            expect(lesson.content.trim().length).toBeGreaterThan(0);
        });
    });

    describe("quizzes", () => {
        lessons
            .filter(lesson => lesson.quiz && lesson.quiz.length > 0)
            .forEach(lesson => {
                describe(`aula "${lesson.title}"`, () => {
                    it("tem pelo menos 2 opções em cada pergunta", () => {
                        lesson.quiz!.forEach(question => {
                            expect(question.options.length).toBeGreaterThanOrEqual(2);
                        });
                    });

                    it("o correctIndex de cada pergunta aponta para uma opção que existe", () => {
                        lesson.quiz!.forEach(question => {
                            expect(question.correctIndex).toBeGreaterThanOrEqual(0);
                            expect(question.correctIndex).toBeLessThan(
                                question.options.length
                            );
                        });
                    });

                    it("não tem opções de resposta duplicadas na mesma pergunta", () => {
                        lesson.quiz!.forEach(question => {
                            const uniqueOptions = new Set(question.options);
                            expect(uniqueOptions.size).toBe(question.options.length);
                        });
                    });
                });
            });
    });

    describe("desafios de código", () => {
        lessons
            .filter(lesson => lesson.challenge)
            .forEach(lesson => {
                it(`aula "${lesson.title}" tem instruções e código inicial não vazios`, () => {
                    expect(lesson.challenge!.instructions.trim().length).toBeGreaterThan(0);
                    expect(lesson.challenge!.starterCode.trim().length).toBeGreaterThan(0);
                });
            });
    });
});
