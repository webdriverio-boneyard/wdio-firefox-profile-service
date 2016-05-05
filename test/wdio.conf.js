var chai = require('chai')
var path = require('path')

exports.config = {
    specs: ['./test/test.spec.js'],
    capabilities: [{
        browserName: 'firefox'
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
