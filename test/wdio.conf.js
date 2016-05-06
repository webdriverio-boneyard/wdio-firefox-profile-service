var chai = require('chai')
var path = require('path')

exports.config = {
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,

    specs: ['./test/test.spec.js'],
    capabilities: [{
        browserName: 'firefox',
        platform: 'OS X 10.11',
        version: '45.0',
        name: 'wdio-firefox-profile-service',
        build: 'wdio-firefox-profile-service - ' + process.env.BUILD_NUMBER
    }],
    baseUrl: 'http://google.com',
    framework: 'mocha',
    logLevel: 'verbose',
    reporters: ['dot'],
    services: [
        require('../launcher')
    ],
    firefoxProfile: {
        extensions: [path.join(__dirname, '/fixtures/WebdriverIOTestExtension.xpi')],
        'browser.startup.homepage': 'http://webdriver.io'
    },
    mochaOpts: {
        timeout: 9999999,
        ui: 'bdd'
    },
    before: function () {
        chai.should()
    }
}
