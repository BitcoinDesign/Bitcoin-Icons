const { build } = require("esbuild");
const glob = require("tiny-glob");
const fs = require("fs/promises");

(async () => {
    // filled
    const filledEntryPoints = await glob("./tmp-react-comps/filled/*.{ts,tsx}");

    await build({
        entryPoints: filledEntryPoints,
        format: "cjs",
        minify: true,
        outdir: "./react-native/filled",
    });

    await build({
        entryPoints: filledEntryPoints,
        format: "esm",
        minify: true,
        outdir: "./react-native/filled/esm",
    });

    await fs.writeFile("./react-native/filled/package.json", `{"module": "./esm/index.js"}`);

    // outline
    const outlineEntryPoints = await glob("./tmp-react-comps/outline/*.{ts,tsx}");

    await build({
        entryPoints: outlineEntryPoints,
        format: "cjs",
        minify: true,
        outdir: "./react-native/outline",
    });

    await build({
        entryPoints: outlineEntryPoints,
        format: "esm",
        minify: true,
        outdir: "./react-native/outline/esm",
    });

    await fs.writeFile("./react-native/outline/package.json", `{"module": "./esm/index.js"}`);
})();
