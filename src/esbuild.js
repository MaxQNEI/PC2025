import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import FSP from "fs/promises";
import { PathDocs, PathEntryPoint, PathIndexHTML, PathOutfile } from "../config.js";

const isBuild = process.argv.includes("--build");
const isDev = !isBuild && process.argv.includes("--dev");

console.log("isBuild", isBuild);
console.log("isDev", isDev);

const mtd = isBuild ? esbuild.build : esbuild.context;

const ctx = await mtd({
    entryPoints: [PathEntryPoint],
    outfile: PathOutfile,
    bundle: true,
    minify: true,
    plugins: [esbuildSvelte()],
    logLevel: "info",
});

if (isBuild) {
    await updTimestamp();
}

if (isDev) {
    await ctx.watch();

    (async () => {
        try {
            const update = ["bundle.css", "bundle.js"];
            const watcher = FSP.watch(PathDocs, { recursive: false });

            let updTimeout;
            for await (const event of watcher) {
                if (!update.includes(event.filename)) {
                    continue;
                }

                updTimeout && clearTimeout(updTimeout);
                updTimeout = setTimeout(updTimestamp, 100);
            }
        } catch (err) {
            if (err.name === "AbortError") {
                return;
            }

            throw err;
        }
    })();
}

async function updTimestamp() {
    const now = Date.now();
    const html = (await FSP.readFile(PathIndexHTML, { encoding: "utf-8" })).replace(
        /"(bundle\.(js|css))(\?t=\d+)?"/g,
        `"$1?t=${now}"`,
    );

    await FSP.writeFile(PathIndexHTML, html, { encoding: "utf-8" });
}
