#! /bin/sh

export NODE_ENV=development
webpack-dev-server --port 8081 --config config/webpack.config.dev.js
