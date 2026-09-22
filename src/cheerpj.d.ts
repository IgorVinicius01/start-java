// O CheerpJ é carregado via <script> no index.html (não é um módulo npm),
// então suas funções ficam disponíveis como globais no navegador.
// Referência oficial: https://cheerpj.com/docs/reference

declare function cheerpjInit(options?: {
    status?: string;
    version?: string;
}): Promise<void>;

declare function cheerpjRunMain(
    mainClass: string,
    classPath: string,
    ...args: string[]
): Promise<number>;

declare function cheerpjCreateDisplay(
    width: number,
    height: number,
    element?: HTMLElement | null
): void;

declare function cheerpOSAddStringFile(
    path: string,
    content: string | Uint8Array
): void;
