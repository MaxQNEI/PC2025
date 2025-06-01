import esbuild from "esbuild";
import esbuildSvelte from "esbuild-svelte";
import { PathEntryPoint, PathOutfile } from "../config.js";


const ctx = await esbuild.context({
    entryPoints: [PathEntryPoint],
    outfile: PathOutfile,
    bundle: true,
    minify: true,
    plugins: [esbuildSvelte()],
    logLevel: "info",
});

await ctx.watch();
