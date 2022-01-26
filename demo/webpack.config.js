const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'wwwroot'),
        filename: 'main.js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'node_modules/@xzar90/secure-storage/dist/secure-storage.min.js',
                    to: './secure-storage.min.js',
                },
            ],
        }),
    ],
};
