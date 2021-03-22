// Create new page
const page = figma.createPage()
page.name = "Icons for export"

figma.root.appendChild(page);

// Get all nodes that are components and begin with "Icon/"
const nodes = figma.currentPage.findAll(node => node.name.indexOf('Icon/') === 0 && node.type == 'COMPONENT_SET')

const newNodes = []

let x = 0
let y = 0

// Create instance of each component and variant
for (const node of nodes) {
	// Only use components with variants.
	if(node.type === 'COMPONENT_SET') {

		// Loop all component variants.
		for(const nodeVariant of node.children) {
			if(nodeVariant.type === 'COMPONENT') {
				if(nodeVariant.type === 'COMPONENT') {
					let exportIcon = false

					// Variant settings are stored in the instance name.
					// Use them to figure out whether to export and into which folder.
					// "Style=Filled, Size=Big"
					const variantNameBits = nodeVariant.name.split(', ')
					let subFolder = ''
					for(const bit of variantNameBits) {
						const subBits = bit.split('=')

						switch(subBits[0]) {
							case 'Style':
								// Use the style name as folder name
								subFolder = subBits[1] + '/'
								break;
							case 'Size':
								// Only export Medium sizes for now
								exportIcon = subBits[1] == 'Medium'
								break;
						}
					}

					if(exportIcon === true) {
						const nodeInstance = nodeVariant.createInstance()

						// Position nicely, assuming a 40x40 grid.
						nodeInstance.x += x * 40
						nodeInstance.y += y * 40

						// Finalize name.
						// "Icon/Bitcoin circle" with variant "Style=Outline" becomes
						// "outline/bitcoin-circle"
						let newName = subFolder + node.name.split('/')[1]
						newName = newName.toLowerCase().replace(' ', '-')
						nodeInstance.name = newName

						nodeInstance.exportSettings = [
							{
								contentsOnly: true,
								format: 'SVG',
								suffix: '',
								svgIdAttribute: false,
								svgOutlineText: true,
								svgSimplifyStroke: true
							}
						]

						// Add instance to our new page.
						page.appendChild(nodeInstance)

						// Keep track of instances for selection.
						newNodes.push(nodeInstance)

						x++

						// Reset the row every 10 icons
						if(x >= 10) {
							x = 0
							y += 1
						}
					}
				}
			}
		}
	}
}

// Select our new instances for easy export.
page.selection = newNodes

// Go to our new page.
figma.currentPage = page

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin()
