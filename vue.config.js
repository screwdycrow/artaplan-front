module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    pwa: {
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true
        }
    },


}