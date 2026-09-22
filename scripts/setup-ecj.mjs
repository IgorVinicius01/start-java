import { createWriteStream, existsSync, mkdirSync, readFileSync, unlinkSync, renameSync } from "node:fs";
import { createHash } from "node:crypto";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ECJ_VERSION = "3.46.0";
const ECJ_URL = "https://repo1.maven.org/maven2/org/eclipse/jdt/ecj/3.22.0/ecj-3.22.0.jar";
const ECJ_SHA1_URL = `${ECJ_URL}.sha1`;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VENDOR_DIR = path.resolve(__dirname, "..", "public", "vendor");
const OUTPUT_PATH = path.join(VENDOR_DIR, "ecj-compiler.jar");
const TMP_PATH = `${OUTPUT_PATH}.download`;

function followRedirects(url, onResponse, reject) {
    https
        .get(url, res => {
            const { statusCode, headers } = res;
            if (statusCode && statusCode >= 300 && statusCode < 400 && headers.location) {
                res.resume();
                followRedirects(headers.location, onResponse, reject);
                return;
            }
            if (statusCode !== 200) {
                res.resume();
                reject(new Error(`Falha ao baixar ${url}: HTTP ${statusCode}`));
                return;
            }
            onResponse(res);
        })
        .on("error", reject);
}

function fetchText(url) {
    return new Promise((resolve, reject) => {
        followRedirects(
            url,
            res => {
                let data = "";
                res.setEncoding("utf8");
                res.on("data", chunk => (data += chunk));
                res.on("end", () => resolve(data.trim()));
                res.on("error", reject);
            },
            reject
        );
    });
}

function fetchToFile(url, destPath) {
    return new Promise((resolve, reject) => {
        followRedirects(
            url,
            res => {
                const fileStream = createWriteStream(destPath);
                res.pipe(fileStream);
                fileStream.on("finish", () => fileStream.close(err => (err ? reject(err) : resolve())));
                fileStream.on("error", reject);
            },
            reject
        );
    });
}

function sha1OfFile(filePath) {
    return createHash("sha1").update(readFileSync(filePath)).digest("hex");
}

function cleanupTmpFile() {
    if (existsSync(TMP_PATH)) {
        try {
            unlinkSync(TMP_PATH);
        } catch {
            
        }
    }
}

async function main() {
    if (existsSync(OUTPUT_PATH)) {
        console.log("[setup-ecj] Compilador Java (ECJ) já está presente — pulando download.");
        return;
    }

    mkdirSync(VENDOR_DIR, { recursive: true });

    console.log(`[setup-ecj] Baixando o compilador Java (ECJ ${ECJ_VERSION})...`);

    try {
        await fetchToFile(ECJ_URL, TMP_PATH);

        console.log("[setup-ecj] Verificando integridade do arquivo baixado...");
        const expectedSha1 = (await fetchText(ECJ_SHA1_URL)).split(/\s+/)[0]?.toLowerCase();
        const actualSha1 = sha1OfFile(TMP_PATH).toLowerCase();

        if (!expectedSha1 || expectedSha1 !== actualSha1) {
            throw new Error(
                `Checksum do ECJ não confere (esperado ${expectedSha1 || "desconhecido"}, obtido ${actualSha1}). O download pode ter sido corrompido.`
            );
        }

        renameSync(TMP_PATH, OUTPUT_PATH);
        console.log("[setup-ecj] Compilador Java pronto em public/vendor/ecj-compiler.jar");
    } catch (err) {
        cleanupTmpFile();
        console.error("\n[setup-ecj] Não foi possível preparar o compilador Java automaticamente.");
        console.error("[setup-ecj]", err instanceof Error ? err.message : err);
        console.error(
            "[setup-ecj] O restante do site vai funcionar normalmente — apenas a seção \"Pratique agora\"\n" +
            "            (compilar/rodar código Java no navegador) ficará indisponível até isso ser resolvido.\n" +
            `[setup-ecj] Para corrigir manualmente: baixe ${ECJ_URL}\n` +
            `            e salve o arquivo como ${OUTPUT_PATH}`
        );
    }
}

main();
