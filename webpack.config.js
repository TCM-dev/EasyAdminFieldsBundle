var Encore = require('@symfony/webpack-encore');
const WebpackRTLPlugin = require('webpack-rtl-plugin');

Encore
    .setOutputPath('./src/Resources/public/')
    .setPublicPath('./')
    .setManifestKeyPrefix('bundles/easyadmin-fields')

    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableSourceMaps(true)
    .enableVersioning(false)
    .disableSingleRuntimeChunk()
    .enableTypeScriptLoader()
    .enableReactPreset()

    .addPlugin(new WebpackRTLPlugin())

    .addEntry('main', './assets/main.ts')
    .addEntry('app', './assets/css/app.scss')
;

module.exports = Encore.getWebpackConfig();
