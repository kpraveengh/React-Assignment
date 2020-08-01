const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = options = {
    // Actual file entry 
    entry: {
        index: './src/index.tsx'
    },

    devtool: "source-map", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.

    mode: 'development',
    devServer: {
        // proxy: { // proxy URLs to backend development server
        //     '/': 'http://127.0.0.1:8080'
        // },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        port: 8080,
        host: 'localhost',
        disableHostCheck: true,
        open: true, //the dev server will open the browser.
        // useLocalIp: true,//This option lets the browser open with your local IP.
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: "/node_modules/"
        },
        stats: "verbose" // The stats option lets you precisely control what bundle information gets displayed
    },

    // out put file 
    output: {
        path: path.resolve(__dirname, "./../www"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: './js/[name].[hash:6].js',
        // the filename template for entry chunks
        sourceMapFilename: './js/[name].[hash:6].js.map',
        chunkFilename: './js/[id].chunk.js',
    },

    resolve: {
        // list of extensions that has to be resolved automatically. With this options there is no need of adding file extension while importing
        extensions: [
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json',
            '.scss',
            '.css',
            '.svg',
            '.css'
        ],
    },
    module: {
        // define loaders here
        rules: [{
            // Typescript loader
            test: /\.(ts|tsx|js|jsx)$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            //SCSS loader
            test: /\.(scss|sass)$/,
            include: path.join(__dirname, '../assets/scss'),
            loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
            // CSS loader
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            // Images loader
            test: /\.(png|svg|jpg|gif|ico)$/,
            use: [
                'file-loader?name=./images/[name].[hash:6].[ext]'
            ]
        },
        {
            // Fonts laoder
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader?name=./fonts/[name].[hash:6].[ext]'
            ]
        },
        {
            // CSV and TSV  loader
            test: /\.(csv|tsv)$/,
            use: [
                'csv-loader?name=./app_data/[name].[hash:6].[ext]'
            ]
        },
        {
            //  XML Loader
            test: /\.xml$/,
            use: [
                'xml-loader?name=./app_data/[name].[hash:6].[ext]'
            ]
        },
        {
            //  JSON Loader
            test: /\.json$/,
            use: [
                'file-loader?name=./app_data/[name].[hash:6].[ext]'
            ]
        }
        ]
    },
    plugins: [
        // inject HTML
        new HtmlWebpackPlugin({
            inject: 'body', // Inject all assets 
            template: './assets/html/index.html',
            chunkhash: true // append a unique webpack compilation chunkhash to all included scripts and CSS files. This is useful for cache busting.
        }),
        new CopyWebpackPlugin([
            { from: 'favicon.ico', to: './' }
        ]),

        // ENV variables
        new webpack.DefinePlugin({
            __DEV__: true,
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'APP_VERSION': JSON.stringify('v0.0.1'),
                'API_DOMAIN': JSON.stringify('')

            }
        }),
        new webpack.BannerPlugin({
            banner: "hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
        }),

        // gives bundle analyzer @ <ur ip>:3004
        new BundleAnalyzerPlugin({
            // Can be `server`, `static` or `disabled`. 
            // In `server` mode analyzer will start HTTP server to show bundle report. 
            // In `static` mode single HTML file with bundle report will be generated. 
            // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`. 
            analyzerMode: 'server',
            // Host that will be used in `server` mode to start HTTP server. 
            analyzerHost: '127.0.0.1',
            // Port that will be used in `server` mode to start HTTP server. 
            analyzerPort: 3004,
            // Path to bundle report file that will be generated in `static` mode. 
            // Relative to bundles output directory. 
            reportFilename: 'report.html',
            // Module sizes to show in report by default. 
            // Should be one of `stat`, `parsed` or `gzip`. 
            // See "Definitions" section for more information. 
            defaultSizes: 'parsed',
            // Automatically open report in default browser 
            openAnalyzer: false,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory 
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`. 
            // Relative to bundles output directory. 
            statsFilename: 'stats.json',
            // Options for `stats.toJson()` method. 
            // For example you can exclude sources of your modules from stats file with `source: false` option. 
            // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21 
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'. 
            logLevel: 'info'
        })

    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};
