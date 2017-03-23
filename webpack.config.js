module.exports = {
    entry: {
        background: './src/background.ts',
        options: "./src/options.ts",
        popup: "./src/popup.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist/js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};