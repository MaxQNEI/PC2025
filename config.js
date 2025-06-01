import PATH from "path";

export const PathRoot = import.meta.dirname;

export const PathEntryPoint = PATH.resolve(PathRoot, "src", "app.js");

export const PathOutfile = PATH.resolve(PathRoot, "docs", "bundle.js");
