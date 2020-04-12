const path = require('path');

module.exports = function override(config, env) {
    config.resolve.alias = {
        ...config.resolve.alias,
        loader: path.resolve(__dirname, "src/loader"),
        client: path.resolve(__dirname, "src/client")
    }
    return config;
}