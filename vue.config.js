const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        output: {
            filename: "js/[name].[contenthash].js",
            chunkFilename: "js/[name].[contenthash].js"
        }
    }
})
