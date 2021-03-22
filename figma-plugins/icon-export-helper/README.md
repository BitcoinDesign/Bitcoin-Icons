
# Bitcoin icon set export helper

This folder contains the source code for a Figma plugin that helps exporting the icons from Figma in the desired formats. Working with visual assets in a design tool is very different than in development. This is a single-purpose plugin and is only relevant to anyone who wants to update the PNGs and SVGs in this repo from the source Figma file.

In your Terminal, run `npm install` in this folder to download required dependencies. Then run `npm build` to compile the plugin. In Figma, add a new plugin via the `Link existing plugin`option. Go to the `icons` page and run the plugin. It creates a new page with all icons ready to be exported.