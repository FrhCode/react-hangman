const HtmlWebpackPlugin = require("html-webpack-plugin");

exports.populateHtmlPlugins = (...pagesArray) => {
    return pagesArray.map((page) => {
        return new HtmlWebpackPlugin({
            filename: page.toLowerCase(),
            template: `./src/${page.toLowerCase()}`,
        });
    });
};
