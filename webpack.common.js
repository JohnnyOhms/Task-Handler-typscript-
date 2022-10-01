module.exports = {
    entry: {
        main: "./src/index.ts",
        vendor: "./src/vendor.ts"
    },
    module: {
        rules: [
            {
            test: /\.html$/i,
            loader: "html-loader",  
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader",],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}