const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: path.join(__dirname, './src/index.jsx'),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.join(__dirname, "public/dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./template.html")
        }),
    ],
    watch: true
}
