import { NextRequest } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Base absoluta para os arquivos de mídia existentes fora do diretório public do Next
// CWD esperado: DM-Ebooks/Aplicacao/my-app
const BASE_DIR = path.resolve(process.cwd(), "..", "..", "landingpages", "geracao_zumbi", "files");

// Whitelist explícita por segurança
const ALLOWED = new Set([
  "gif-capa.mp4",
  "gif-boy.mp4",
  "gif-brain.mp4",
  "gif-cloud.mp4",
  "gif-hospital.mp4",
  "gif-jail.mp4",
  "capa-ebook-pagina-de-check-out.jpg",
  "Amostra_Gratis_Capitulo_1.pdf",
]);

function getContentType(file: string): string {
  const ext = path.extname(file).toLowerCase();
  switch (ext) {
    case ".mp4":
      return "video/mp4";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

export async function GET(req: NextRequest) {
  try {
    const fileParam = req.nextUrl.searchParams.get("file") || "";

    // Sanitização básica
    const file = path.basename(fileParam);

    if (!file || !ALLOWED.has(file)) {
      return new Response("Arquivo não encontrado", { status: 404 });
    }

    const abs = path.join(BASE_DIR, file);
    const data = await fs.readFile(abs);

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": getContentType(file),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    return new Response("Erro ao servir mídia", { status: 500 });
  }
}
