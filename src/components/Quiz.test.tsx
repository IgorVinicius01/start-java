import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Quiz from "./Quiz";
import type { QuizQuestion } from "../data/lessons";

const questions: QuizQuestion[] = [
    {
        question: "Quanto Ã© 2 + 2?",
        options: ["3", "4", "5"],
        correctIndex: 1,
        explanation: "2 + 2 Ã© igual a 4."
    },
    {
        question: "Qual Ã© a capital do Brasil?",
        options: ["Rio de Janeiro", "SÃ£o Paulo", "BrasÃ­lia"],
        correctIndex: 2
    }
];

describe("Quiz", () => {
    it("renderiza todas as perguntas e opÃ§Ãµes", () => {
        render(<Quiz questions={questions} />);

        expect(screen.getByText(/quanto Ã© 2 \+ 2/i)).toBeInTheDocument();
        expect(screen.getByText(/capital do brasil/i)).toBeInTheDocument();
        expect(screen.getByText("BrasÃ­lia")).toBeInTheDocument();
    });

    it("mantÃ©m o botÃ£o de verificar desabilitado atÃ© todas as perguntas serem respondidas", async () => {
        const user = userEvent.setup();
        render(<Quiz questions={questions} />);

        const submitButton = screen.getByRole("button", {
            name: /verificar respostas/i
        });
        expect(submitButton).toBeDisabled();

        await user.click(screen.getByText("4"));
        expect(submitButton).toBeDisabled();

        await user.click(screen.getByText("BrasÃ­lia"));
        expect(submitButton).toBeEnabled();
    });

    it("mostra feedback de acerto e de erro por pergunta, sem depender sÃ³ da cor", async () => {
        const user = userEvent.setup();
        render(<Quiz questions={questions} />);

        // Responde errado a primeira e certo a segunda
        await user.click(screen.getByText("3"));
        await user.click(screen.getByText("BrasÃ­lia"));

        await user.click(
            screen.getByRole("button", { name: /verificar respostas/i })
        );

        // Feedback textual de erro (nÃ£o depende sÃ³ da cor vermelha)
        expect(screen.getByText(/resposta incorreta/i)).toBeInTheDocument();
        expect(screen.getByText(/2 \+ 2 Ã© igual a 4/i)).toBeInTheDocument();

        // Indicador textual de "correta" (nÃ£o depende sÃ³ da cor verde)
        expect(screen.getAllByText(/âœ“ correta/i).length).toBeGreaterThan(0);

        // Placar final (usamos o elemento inteiro para nÃ£o confundir com
        // o "1" que tambÃ©m aparece na numeraÃ§Ã£o da primeira pergunta)
        const scoreLine = screen.getByText(/vocÃª acertou/i).closest("span");
        expect(scoreLine).toHaveTextContent("VocÃª acertou 1 de 2");
    });

    it("permite tentar novamente, limpando as respostas anteriores", async () => {
        const user = userEvent.setup();
        render(<Quiz questions={questions} />);

        await user.click(screen.getByText("4"));
        await user.click(screen.getByText("BrasÃ­lia"));
        await user.click(
            screen.getByRole("button", { name: /verificar respostas/i })
        );

        expect(screen.getByText(/vocÃª acertou/i)).toBeInTheDocument();

        await user.click(
            screen.getByRole("button", { name: /tentar novamente/i })
        );

        expect(
            screen.getByRole("button", { name: /verificar respostas/i })
        ).toBeDisabled();
        expect(screen.queryByText(/vocÃª acertou/i)).not.toBeInTheDocument();
    });
});

