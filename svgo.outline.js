module.exports = {
    js2svg: {
        indent: 2, // string with spaces or number of spaces. 4 by default
        pretty: true, // boolean, false by default
    },
    plugins: [
        {
            name: 'preset-default',
            active: true
        },
        {
            name: 'removeDimensions',
            active: true
        },
        {
            name: 'sortAttrs',
            active: true
        },
        {
            name: 'removeAttrs',
            params: {
                attrs: '(stroke|fill-rule)'
            }
        },
        {
            name: 'addAttributesToSVGElement',
            active: true,
            params: {
                attributes: ['stroke="currentColor"']
            }
        },
        {
            name: 'cleanupListOfValues',
            active: true
        }
    ]
};
