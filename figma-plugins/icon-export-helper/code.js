// Create new page
const page = figma.createPage();
page.name = "Icons for export";
figma.root.appendChild(page);
// Get all nodes that are components and begin with "Icon/"
const nodes = figma.currentPage.findAll(node => node.name.indexOf('Icon/') === 0 && node.type == 'COMPONENT_SET');
const newNodes = [];
const iconData = {};
const problematicIcons = {};
let svgX = 0;
let svgY = 0;
let pngX = 0;
let pngY = 0;
function toPascalCase(string) {
    return `${string}`
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(new RegExp(/\s+(.)(\w+)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`)
        .replace(new RegExp(/\s/, 'g'), '')
        .replace(new RegExp(/\w/), s => s.toUpperCase());
}
function exportComponentAsSVG(node, nodeVariant, subFolder) {
    let nodeInstance = nodeVariant.createInstance();
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
    // Detach from main component.
    nodeInstance = nodeInstance.detachInstance();
    // Delete hidden children
    deleteHiddenChildren(nodeInstance);
    flattenBooleanGroups(nodeInstance);
    flattenRotatedGroupsOnFilledIcon(nodeInstance);
    outlineStrokesOnFilledIcon(nodeInstance);
    checkIcon(nodeInstance);
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
    iconInfo.id = toPascalCase(iconName);
    iconData[iconName] = iconInfo;
    svgX++;
    // Reset the row every 10 icons
    if (svgX >= 10) {
        svgX = 0;
        svgY += 1;
    }
}
// Deletes hidden children
function deleteHiddenChildren(nodeInstance) {
    let child;
    for (let i = 0; i < nodeInstance.children.length; i++) {
        child = nodeInstance.children[i];
        if (child.visible !== true) {
            // Delete invisible child.
            child.remove();
        }
        else if (child.type == 'GROUP') {
            // If it's a group, go deeper.
            deleteHiddenChildren(child);
        }
    }
}
// Flattens boolean groups
function flattenBooleanGroups(nodeInstance, fullNodeName = null) {
    if (!fullNodeName) {
        fullNodeName = nodeInstance.name;
    }
    else {
        fullNodeName += '/' + nodeInstance.name;
    }
    // console.log('flattenBooleanGroups', nodeInstance, fullNodeName)
    let child, flattenedChild;
    for (let i = 0; i < nodeInstance.children.length; i++) {
        child = nodeInstance.children[i];
        if (child.type == 'GROUP') {
            // If it's a group, go deeper.
            flattenBooleanGroups(child, fullNodeName);
        }
        else if (child.type == 'BOOLEAN_OPERATION' && child.visible !== false) {
            // Flatten boolean groups.
            if (child.children.length > 0) {
                try {
                    // console.log('f', child, child.name, child.visible, fullNodeName)
                    flattenedChild = figma.flatten([child], child.parent, i);
                    // console.log('flattenedChild', flattenedChild, flattenedChild.fills, fullNodeName, flattenedChild.name)
                }
                catch (error) {
                    console.log('error', error);
                }
            }
        }
    }
}
function flattenRotatedGroupsOnFilledIcon(nodeInstance, fullNodeName = null) {
    if (!fullNodeName) {
        fullNodeName = nodeInstance.name;
    }
    else {
        fullNodeName += '/' + nodeInstance.name;
    }
    let child, flattenedChild;
    if (nodeInstance.children) {
        for (let i = 0; i < nodeInstance.children.length; i++) {
            child = nodeInstance.children[i];
            flattenedChild = null;
            if (fullNodeName.indexOf('filled') !== -1 && child.rotation != 0) {
                // Flatten boolean groups.
                try {
                    flattenedChild = figma.flatten([child], child.parent, i);
                }
                catch (error) {
                    console.log('error', error);
                }
            }
            if (flattenedChild) {
                if (flattenedChild.type == 'GROUP') {
                    // If it's a group, go deeper.
                    flattenRotatedGroupsOnFilledIcon(flattenedChild, fullNodeName);
                }
            }
            else if (child) {
                if (child.type == 'GROUP') {
                    // If it's a group, go deeper.
                    flattenRotatedGroupsOnFilledIcon(child, fullNodeName);
                }
            }
        }
    }
}
function outlineStrokesOnFilledIcon(nodeInstance, fullNodeName = null) {
    if (!fullNodeName) {
        fullNodeName = nodeInstance.name;
    }
    else {
        fullNodeName += '/' + nodeInstance.name;
    }
    // console.log('flattenStrokesOnFilledIcon', nodeInstance, fullNodeName)
    let child, flattenedChild, newChild;
    if (nodeInstance.children) {
        for (let i = 0; i < nodeInstance.children.length; i++) {
            child = nodeInstance.children[i];
            // console.log('i', fullNodeName, child.name, child.strokes)
            if (child.type == 'GROUP') {
                // If it's a group, go deeper.
                outlineStrokesOnFilledIcon(child, fullNodeName);
            }
            else if (fullNodeName.indexOf('filled') !== -1 && child.strokes && child.strokes.length > 0) {
                // Flattening a stroke on a filled icon
                // console.log('Flatting stroke', fullNodeName, child.name)
                try {
                    newChild = child.outlineStroke();
                    child.parent.insertChild(i, newChild);
                    newChild.x = child.x;
                    newChild.y = child.y;
                    child.remove();
                }
                catch (error) {
                    console.log('error', error);
                }
            }
        }
    }
}
// Checks if icons are clean
// Outline icon shapes should not have fills
// Filled icon shapes should not have outlines
function checkIcon(nodeInstance, fullNodeName = null) {
    if (!fullNodeName) {
        fullNodeName = nodeInstance.name;
    }
    else {
        fullNodeName += '/' + nodeInstance.name;
    }
    const trimmedName = fullNodeName.split('/').splice(0, 3).join('/');
    if (fullNodeName.indexOf('outline') !== -1 && nodeInstance.fills && nodeInstance.fills.length > 0) {
        // console.log('Outline icon "' + fullNodeName + '" has fills - fix it!')
        // if(!problematicIcons[trimmedName]) {
        // 	problematicIcons[trimmedName] = {}
        // }
        // problematicIcons[trimmedName]['fill-on-outline-icon'] = true
    }
    if (fullNodeName.indexOf('filled') !== -1 && nodeInstance.strokes && nodeInstance.strokes.length > 0) {
        // console.log('Filled icon "' + fullNodeName + '" has strokes - fix it!')
        if (!problematicIcons[trimmedName]) {
            problematicIcons[trimmedName] = {};
        }
        problematicIcons[trimmedName]['outline-on-filled-icon'] = true;
    }
    if (fullNodeName.indexOf('filled') !== -1 && nodeInstance.type == 'GROUP' && nodeInstance.rotation != 0) {
        if (!problematicIcons[trimmedName]) {
            problematicIcons[trimmedName] = {};
        }
        problematicIcons[trimmedName]['rotated-group'] = true;
    }
    if (nodeInstance.children) {
        let child;
        for (let i = 0; i < nodeInstance.children.length; i++) {
            child = nodeInstance.children[i];
            checkIcon(child, fullNodeName);
        }
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
console.log('Problematic icons', problematicIcons);
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
