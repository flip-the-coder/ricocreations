const webpack = require('webpack');
const path = require('path');

const plugin = {
    overrideWebpackConfig: ({ webpackConfig, pluginOptions }) => {
        // Add any additional Webpack modifications here if needed
        return webpackConfig;
    },
    overrideDevServerConfig: ({ devServerConfig }) => {
        devServerConfig.headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        };
        return devServerConfig;
    },
};

module.exports = {
    plugins: [
        {
            plugin: plugin,
        },
    ],
    webpack: {
        configure: (webpackConfig) => {
            // Add custom resolve alias from webpack.config.js
            webpackConfig.resolve.alias = {
                '@components': path.resolve(__dirname, 'src/components/'),
                '@utils': path.resolve(__dirname, 'src/utils/'),
            };

            // Add fallback for Node.js built-ins
            webpackConfig.resolve.fallback = {
                stream: require.resolve('stream-browserify'),
                crypto: require.resolve('crypto-browserify'),
                vm: require.resolve('vm-browserify'),
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                process: require.resolve('process/browser'),
                buffer: require.resolve('buffer/'),
                util: require.resolve('util/'),
            };

            // Add ProvidePlugin for process and Buffer
            webpackConfig.plugins.push(
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer'],
                })
            );

            // Enable source maps for better debugging
            webpackConfig.devtool = 'source-map';

            // Suppress source map warnings for missing files in node_modules
            webpackConfig.module.rules.push({
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
                exclude: /node_modules/, // Exclude node_modules from being processed by source-map-loader
            });

            // Ignore warnings for missing source maps
            webpackConfig.ignoreWarnings = [
                {
                    message: /Failed to parse source map/,
                },
            ];

            return webpackConfig;
        },
    },
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
        },
        compress: true,
        port: 3001,
        historyApiFallback: true,
    },
};
