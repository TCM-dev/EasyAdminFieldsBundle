var Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('./src/Resources/public/')
    .setPublicPath('./')
    .setManifestKeyPrefix('bundles/easyadmin-fields')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(true)
    .enableVersioning(false)
    .disableSingleRuntimeChunk()
    .enableTypeScriptLoader()

    .addEntry('main', './assets/main.ts')
;

module.exports = Encore.getWebpackConfig();
