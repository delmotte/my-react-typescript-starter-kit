const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
        template: conf.path.src('index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
];

if (process.env.NODE_ENV !== 'production') {
    const Dashboard = require('webpack-dashboard');
    const DashboardPlugin = require('webpack-dashboard/plugin');
    const dashboard = new Dashboard();
    plugins.push(new DashboardPlugin(dashboard.setData));
}

module.exports = {
    module: {
        preLoaders: [],

        loaders: [
            {
                test: /.json$/,
                loaders: [
                    'json'
                ]
            },
            {
                test: /\.(css|scss)$/,
                loaders: [
                    'style',
                    'css',
                    'sass',
                    'postcss'
                ]
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'ts'
                ]
            }
        ]
    },
    plugins: plugins,
    postcss: () => [autoprefixer],
    debug: true,
    devtool: 'source-map',
    output: {
        path: path.join(process.cwd(), conf.paths.tmp),
        filename: 'index.js'
    },
    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.js',
            '.ts',
            '.tsx'
        ]
    },
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        `./${conf.path.src('index')}`
    ],
    ts: {
        configFileName: 'tsconfig.json',
        silent: true
    }
};
