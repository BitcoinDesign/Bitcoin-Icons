// Create new page
const page = figma.createPage();
page.name = "Icons for export";
figma.root.appendChild(page);
// Get all nodes that are components and begin with "Icon/"
const nodes = figma.currentPage.findAll(node => node.name.indexOf('Icon/') === 0 && node.type == 'COMPONENT_SET');
const newNodes = [];
const iconData = {};
let svgX = 0;
let svgY = 0;
let pngX = 0;
let pngY = 0;
function exportComponentAsSVG(node, nodeVariant, subFolder) {
    const nodeInstance = nodeVariant.createInstance();
    // Position nicely, assuming a 40x40 grid.
    nodeInstance.x += svgX * 40;
    nodeInstance.y += svgY * 40;
    nodeInstance.resize(24, 24);
    // Finalize name.
    // "Icon/Bitcoin circle" with variant "Style=Outline" becomes
    // "outline/bitcoin-circle"
    let newName = 'svg/' + subFolder + node.name.split('/')[1];
    newName = newName.toLowerCase().replace(' ', '-');
    nodeInstance.name = newName;
    nodeInstance.exportSettings = [
        {
            contentsOnly: true,
            format: 'SVG',
            suffix: '',
            svgIdAttribute: false,
            svgOutlineText: true,
            svgSimplifyStroke: true
        }
    ];
    // Add instance to our new page.
    page.appendChild(nodeInstance);
    // Keep track of instances for selection.
    newNodes.push(nodeInstance);
    const iconName = newName.split('/')[2];
    const folderName = newName.split('/')[1];
    let iconInfo = iconData[iconName];
    if (!iconInfo) {
        iconInfo = {
            name: node.name.split('/')[1]
        };
    }
    iconInfo[folderName] = true;
    iconInfo.svg = true;
    if (node.description) {
        iconInfo.description = node.description;
    }
    iconData[iconName] = iconInfo;
    svgX++;
    // Reset the row every 10 icons
    if (svgX >= 10) {
        svgX = 0;
        svgY += 1;
    }
}
function exportComponentAsPNG(node, nodeVariant, subFolder) {
    const nodeInstance = nodeVariant.createInstance();
    // Position nicely, assuming a 40x40 grid.
    nodeInstance.x += (12 + pngX) * 40;
    nodeInstance.y += pngY * 40;
    nodeInstance.resize(24, 24);
    // Finalize name.
    // "Icon/Bitcoin circle" with variant "Style=Outline" becomes
    // "outline/bitcoin-circle"
    let newName = 'png/' + subFolder + node.name.split('/')[1];
    newName = newName.toLowerCase().replace(' ', '-');
    nodeInstance.name = newName;
    nodeInstance.exportSettings = [
        {
            contentsOnly: true,
            format: 'PNG'
        }
    ];
    // Add instance to our new page.
    page.appendChild(nodeInstance);
    // Keep track of instances for selection.
    newNodes.push(nodeInstance);
    const iconName = newName.split('/')[2];
    iconData[iconName].png = true;
    pngX++;
    // Reset the row every 10 icons
    if (pngX >= 10) {
        pngX = 0;
        pngY += 1;
    }
}
// Create instance of each component and variant
for (const node of nodes) {
    // Only use components with variants.
    if (node.type === 'COMPONENT_SET') {
        // Loop all component variants.
        for (const nodeVariant of node.children) {
            if (nodeVariant.type === 'COMPONENT') {
                if (nodeVariant.type === 'COMPONENT') {
                    let exportIcon = false;
                    // Variant settings are stored in the instance name.
                    // Use them to figure out whether to export and into which folder.
                    // "Style=Filled, Size=Big"
                    const variantNameBits = nodeVariant.name.split(', ');
                    let subFolder = '';
                    for (const bit of variantNameBits) {
                        const subBits = bit.split('=');
                        switch (subBits[0]) {
                            case 'Style':
                                // Use the style name as folder name
                                subFolder = subBits[1] + '/';
                                break;
                            case 'Size':
                                // Only export Medium sizes for now
                                exportIcon = subBits[1] == 'Medium';
                                break;
                        }
                    }
                    if (exportIcon === true) {
                        exportComponentAsSVG(node, nodeVariant, subFolder);
                        exportComponentAsPNG(node, nodeVariant, subFolder);
                    }
                }
            }
        }
    }
}
// Select our new instances for easy export.
page.selection = newNodes;
// Go to our new page.
figma.currentPage = page;
// Create a text node to store JSON data.
const textNode = figma.createText();
textNode.x = 1000;
textNode.resize(1000, 1000);
figma.loadFontAsync({ family: "Roboto", style: "Regular" }).then(() => {
    textNode.characters = JSON.stringify(iconData);
});
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
