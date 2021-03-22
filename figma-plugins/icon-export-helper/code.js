// Create new page
const page = figma.createPage();
page.name = "Icons for export";
figma.root.appendChild(page);
// Get all nodes that are components and begin with "Icon/"
const nodes = figma.currentPage.findAll(node => node.name.indexOf('Icon/') === 0 && node.type == 'COMPONENT_SET');
// console.log('nodes', nodes);
const newNodes = [];
let x = 0;
let y = 0;
// Create instance of each component and variant
for (const node of nodes) {
    // console.log('node', node);
    if (node.type === 'COMPONENT_SET') {
        for (const nodeVariant of node.children) {
            if (nodeVariant.type === 'COMPONENT') {
                // console.log('nodeVariant', nodeVariant)
                const nodeInstance = nodeVariant.createInstance();
                // console.log('nodeInstance', nodeInstance)
                if (nodeVariant.type === 'COMPONENT') {
                    // console.log('mainComponent', nodeInstance.mainComponent.name)
                    // console.log('masterComponent', nodeInstance.masterComponent)
                    // for(const testo in nodeInstance.mainComponent) {
                    // 	console.log(testo, nodeInstance.mainComponent[testo])
                    // }
                    nodeInstance.x += x * 40;
                    nodeInstance.y += y * 40;
                    let newName = node.name.substr(5).toLowerCase().replace(' ', '_');
                    const variantNameBits = nodeInstance.mainComponent.name.split(', ');
                    for (const bit of variantNameBits) {
                        newName += '-' + bit.split('=')[1];
                    }
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
                    page.appendChild(nodeInstance);
                    newNodes.push(nodeInstance);
                    x++;
                    if (x >= 10) {
                        x = 0;
                        y += 1;
                    }
                }
            }
        }
    }
}
page.selection = newNodes;
figma.currentPage = page;
// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
