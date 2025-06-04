import PATH from "path";

export const PathRoot = import.meta.dirname;

export const PathEntryPoint = PATH.resolve(PathRoot, "src", "app.js");

export const PathDocs = PATH.resolve(PathRoot, "docs");

export const PathOutfile = PATH.resolve(PathDocs, "bundle.js");

export const PathIndexHTML = PATH.resolve(PathDocs, "index.html");
