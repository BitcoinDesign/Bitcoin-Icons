import svgr from "@svgr/core";
import { promises as fs } from "fs";
import * as filesystem from "fs";
import template from "./template";
const junk = require("junk");
const camelcase = require("camelcase");

type IconStyle = "filled" | "outline";

const resetSrcDir = async () => {
  try {
      let tmpExists = filesystem.existsSync(`./tmp-react-comps`);
      if(tmpExists) await fs.rm(`./tmp-react-comps`, { recursive: true });
      await fs.mkdir(`./tmp-react-comps`);
      await fs.mkdir(`./tmp-react-comps/filled`);
      await fs.mkdir(`./tmp-react-comps/outline`);
  } catch (error) {
    throw new Error("Failed wiping tmp-react-comps folders");
  }
};

const genComponentFromBuffer = async (
  componentName: string,
  svgBuffer: Buffer
): Promise<string> => {
  try {
    return await svgr(
      svgBuffer,
      {
        template,
        svgo: true,
        svgoConfig: { plugins: [{ sortAttrs: true }, { removeXMLNS: true }] },
        ref: false,
        native: true,
        svgProps: { width: "{size}", height: "{size}" },
        plugins: [
          "@svgr/plugin-svgo",
          "@svgr/plugin-jsx",
          "@svgr/plugin-prettier",
        ],
      },
      {
        componentName: componentName,
      }
    );
  } catch (error) {
    throw new Error("Failed generating components");
  }
};

const getIcons = async (style: IconStyle) => {
  const iconDir = "./optimized";
  let files = await fs.readdir(`${iconDir}/${style}`);
  return Promise.all(
    files.filter(junk.not).map(async (file) => ({
      svg: await fs.readFile(`${iconDir}/${style}/${file}`),
      componentName: `${camelcase(file.replace(/\.svg$/, ""), {
        pascalCase: true,
      })}Icon`,
    }))
  );
};

const exportIcons = async (style: IconStyle) => {
  const icons = await getIcons(style);
  for (let { componentName, svg } of icons) {
    const jsx = await genComponentFromBuffer(componentName, svg);
    await fs.writeFile(`./tmp-react-comps/${style}/${componentName}.tsx`, jsx);
    const exportStr = `export { default as ${componentName} } from './${componentName}';\n`;
    await fs.writeFile(`./tmp-react-comps/${style}/index.ts`, exportStr, { flag: "a" });
  }
};

(async () => {
  await resetSrcDir();
  await exportIcons("filled");
  await exportIcons("outline");
})();
