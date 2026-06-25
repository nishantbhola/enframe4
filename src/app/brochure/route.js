import { readFileSync } from "fs";
import path from "path";

export async function GET() {
  const brochurePath = path.join(process.cwd(), "src/components/index.html");
  const brochureHtml = readFileSync(brochurePath, "utf8");

  return new Response(brochureHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
