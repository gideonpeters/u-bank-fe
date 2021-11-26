module.exports = {
    transpileDependencies: ["vuetify"],
    css: {
        loaderOptions: {
            scss: {
                additionalData: `
                      @import "@/assets/styles/abstracts/_variables.scss";
                  `,
            },
        },
    },
    chainWebpack: (config) => {
        const svgRule = config.module.rule("svg");

        svgRule.uses.clear();

        svgRule
            .use("babel-loader")
            .loader("babel-loader")
            .end()
            .use("vue-svg-loader")
            .loader("vue-svg-loader");
    },
    configureWebpack: {
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            },
        },
    },
};
