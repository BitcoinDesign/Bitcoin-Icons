# Bitcoin Icons release process

## Problem

Between Figma, Github releases and NPM modules, it’s getting tricky to keep things in sync.

## Solution

Implement a release process using milestones.
1. We always have an active milestone
1. New requests for icons and icon changes are added as Github issues
1. As we complete them, we add them to the milestone
1. Every few weeks, one of us goes through the release process (if we have enough changes, this won't be very often)

## Release process

This is pretty tedious. If there are parts that could be simplified or automated, let's do it.

### 1. Prepare a milestone

Each release starts with a [milestone](https://github.com/BitcoinDesign/Bitcoin-Icons/milestones) whose name includes the new version number. Create issues for all changes (to icons or otherwise) to be made.

### 2. Prepare icons in Figma

Address the icon changes in Figma. Use the [Export helper plugin](https://github.com/BitcoinDesign/Bitcoin-Icons/tree/main/figma-plugins/icon-export-helper) to prepare clean, exportable frames. Check the dev console in Figma for issues.

### 3. Export icons

1. Export the icons from Figma into your local version of the repo.
2. Run `npm run build` to create optimized files (this may introduce issues, as the SVG code gets modified)
3. Run `npm run prepublishOnly` to prep the modules for local testing

### 4. Test the Vue module

Locally verify icons render correctly. You can use the [bitcoinicons.com](https://github.com/GBKS/bitcoinicons.com) repo for the Vue module.

This is an example of installing the pre-published module and running the site.
```
npm uninstall @bitcoin-design/bitcoin-icons-vue
npm install {{ your workspace directory }}/Bitcoin-Icons/vue
npm run serve
```

### 5. Test the React module

There is a [simple test project](https://github.com/GBKS/bitcoin-icons-react-test) you can use.

```
npm i
npm uninstall @bitcoin-design/bitcoin-icons-react
npm install {{ your workspace directory }}/Bitcoin-Icons/react
npm start
```

### 6. Push icon updates to Github

Increase version numbers in the 3 package.json files (main folder, vue folder, react folder).
Update the 3 README files as needed (main folder, vue folder, react folder).

If everything looks good, create a branch and PR with the updated icons. Name it like "Milestone 0.1.7". Get it reviewed and merged.

### 7. Publish the Vue module

From the `/vue` folder, run `npm publish`.

### 8. Publish the React module

From the `/react` folder, run `npm publish`.

### 9. Publish the release

This is the ZIP file linked to from the site to download all icon SVGs at once.
Create a release branch that only includes the icons.
Link it to the milestone.
Create the release.

### 10. Re-publish the Figma file

Re-publish the file to Figma community with the new version number and a short update.

### 11. Update [bitcoinicons.com](https://github.com/GBKS/bitcoinicons.com)

Update it to latest published version.
Branch, PR, review & merge.

### 12. Double-check

Review it all to ensure the icons are looking badass.

### 13. Prepare the next milestone

Create a new milestone that new issues can be added to.
