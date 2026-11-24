import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import { glob } from "../../util/glob"
import path, { dirname } from "path"

export const Static: QuartzEmitterPlugin = () => ({
  name: "Static",
  async *emit({ argv, cfg }) {
    const staticPath = joinSegments(QUARTZ, "static")
    const fps = await glob("**", staticPath, cfg.configuration.ignorePatterns)
    const outputStaticPath = joinSegments(argv.output, "static")
    await fs.promises.mkdir(outputStaticPath, { recursive: true })
    for (const fp of fps) {
      const src = joinSegments(staticPath, fp) as FilePath
      const dest = joinSegments(outputStaticPath, fp) as FilePath
      await fs.promises.mkdir(dirname(dest), { recursive: true })
      await fs.promises.copyFile(src, dest)
      yield dest
    }

    // Bundle local KaTeX CSS, copy-tex helper, and Webfonts (zero external CDN)
    const katexDist = path.resolve("node_modules/katex/dist")
    const outputKatexPath = joinSegments(outputStaticPath, "katex")
    const outputKatexFontsPath = joinSegments(outputKatexPath, "fonts")
    await fs.promises.mkdir(outputKatexFontsPath, { recursive: true })

    const katexCssDest = joinSegments(outputKatexPath, "katex.min.css") as FilePath
    await fs.promises.copyFile(path.join(katexDist, "katex.min.css"), katexCssDest)
    yield katexCssDest

    const katexCopyDest = joinSegments(outputKatexPath, "copy-tex.min.js") as FilePath
    await fs.promises.copyFile(path.join(katexDist, "contrib", "copy-tex.min.js"), katexCopyDest)
    yield katexCopyDest

    const fontFiles = await fs.promises.readdir(path.join(katexDist, "fonts"))
    for (const fontFile of fontFiles) {
      if (fontFile.endsWith(".woff2") || fontFile.endsWith(".woff") || fontFile.endsWith(".ttf")) {
        const dest = joinSegments(outputKatexFontsPath, fontFile) as FilePath
        await fs.promises.copyFile(path.join(katexDist, "fonts", fontFile), dest)
        yield dest
      }
    }

    // Bundle local Mermaid v12 ESM entry and lazy diagram chunks (zero external CDN)
    const mermaidDist = path.resolve("node_modules/mermaid/dist")
    const outputMermaidPath = joinSegments(outputStaticPath, "mermaid")
    const outputMermaidChunksPath = joinSegments(outputMermaidPath, "chunks", "mermaid.esm.min")
    await fs.promises.mkdir(outputMermaidChunksPath, { recursive: true })

    const mermaidEntryDest = joinSegments(outputMermaidPath, "mermaid.esm.min.mjs") as FilePath
    await fs.promises.copyFile(path.join(mermaidDist, "mermaid.esm.min.mjs"), mermaidEntryDest)
    yield mermaidEntryDest

    const chunkDir = path.join(mermaidDist, "chunks", "mermaid.esm.min")
    const chunkFiles = await fs.promises.readdir(chunkDir)
    for (const chunkFile of chunkFiles) {
      if (chunkFile.endsWith(".mjs")) {
        const dest = joinSegments(outputMermaidChunksPath, chunkFile) as FilePath
        await fs.promises.copyFile(path.join(chunkDir, chunkFile), dest)
        yield dest
      }
    }
  },
  async *partialEmit() {},
})
