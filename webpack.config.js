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
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [
            "node_modules",
        ],
        alias: {
            'handsontable': path.resolve(__dirname, '../handsontable/dist/handsontable.full.js'),
        }
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
    watch: true,
    mode: "development"
}
