const gulp = require('gulp');

const webpack = require('webpack');
const webpackConf = require('../conf/webpack.conf');
const webpackDistConf = require('../conf/webpack-dist.conf');
const gulpConf = require('../conf/gulp.conf');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

gulp.task('webpack:dev', done => {
    webpackWrapper(false, webpackConf, done);
});

gulp.task('webpack:watch', done => {
    webpackWrapper(true, webpackConf, done);
});

gulp.task('webpack:dist', done => {
    process.env.NODE_ENV = 'production';
    webpackWrapper(false, webpackDistConf, done);
});

function webpackWrapper(watch, conf, done) {
    const webpackBundler = webpack(conf);

    const webpackChangeHandler = (err, stats) => {
        if (err) {
            gulpConf.errorHandler('Webpack')(err);
        }
        if (done) {
            done();
            done = null;
        }
    };

    if (process.env.NODE_ENV !== 'production') {
        const dashboard = new Dashboard();
        webpackBundler.apply(new DashboardPlugin(dashboard.setData));
    }

    if (watch) {
        webpackBundler.watch(200, webpackChangeHandler);
    } else {
        webpackBundler.run(webpackChangeHandler);
    }
}
