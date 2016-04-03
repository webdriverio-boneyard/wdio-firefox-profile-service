var chai = require('chai')

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
        extensions: [__dirname + '/fixtures/WebdriverIOTestExtension.xpi'],
        'browser.startup.homepage': 'http://webdriver.io'
    },
    mochaOpts: {
        timeout: 9999999,
        // compilers: ['js:babel-core/register'],
        ui: 'bdd'
    },
    before: function () {
        chai.should()
    }
}
