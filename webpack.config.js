
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// extract-css-chunks-webpack-plugin or mini-css-extract-plugin doesn't matter
// it doesn't work
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {AngularCompilerPlugin} = require('@ngtools/webpack')

module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            { 
                test: /\.ts$/,
                loader: '@ngtools/webpack',
                exclude: /node_modules/
            },
            { 
                test: /\.html$/, 
                loader: 'html-loader',
                exclude: /node_modules/
            },
            { 
                test: /\.scss$/, 
                use: [
                    // 'to-string-loader', // it works and loads styles to head=>style tag
                    MiniCssExtractPlugin.loader, // doesn't work, TypeError: Cannot read property 'replace' of undefined
                    'css-loader',
                    'sass-loader'
                ],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            name: '[name].extracted.css'
        }),
        new AngularCompilerPlugin({
            entryModule: 'src/app/app.module#AppModule',
            tsConfigPath: 'tsconfig.json'
        })
    ]
}