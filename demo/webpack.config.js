const path = require('path');
module.exports = {
    entry: './src/main.js',
    target: ['web', 'es5'],
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'main.js',
    },
};
