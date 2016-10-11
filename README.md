# What is it ?

Just one more annoying starter kit.

This one is clean -> No ESLint or Tests bullshit :D #freedom


This is a fork of https://github.com/FountainJS/generator-fountain-react

Using Webpack + Typescript + React + React Router

# What has been done ?

[X] Removing karma tests

    -> remove karma files and hooks

    -> remove test section in .babelrc

[X] Removing ESLint

    -> remove preLoaders: [/**/] in webpack.conf.js, webpack-dist.conf.js and webpack-test.conf.js

    -> remove config in package.json

[X] Remove unused dependencies

[X] Add webpack dashboard

# how to use it ?

`git clone` + `npm install`

then, just launch `npm run serve` or `npm run build`
