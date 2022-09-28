const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        main: "./src/index.ts",
        vendor: "./src/vendor.ts"
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.bundle.css" }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.(scss)$/i,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader
            //         },
            //         {
            //             loader: 'css-loader'
            //         },
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 postcssOptions: {
            //                     plugins: () => [
            //                         require('autoprefixer')
            //                     ]
            //                 }
            //             }
            //         },
            //         {
            //             loader: 'sass-loader'
            //         }
            //     ]
            // },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}