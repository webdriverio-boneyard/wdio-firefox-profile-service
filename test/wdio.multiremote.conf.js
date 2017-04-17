var chai = require('chai')
var path = require('path')

exports.config = {
    protocol: 'http',
    port: 4445,
    host: 'localhost',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,

    specs: [path.resolve(__dirname, 'test.multiremote.spec.js')],
    capabilities: {
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                platform: 'OS X 10.11',
                version: '45.0',
                name: 'wdio-firefox-profile-service',
                build: 'wdio-firefox-profile-service - ' + process.env.TRAVIS_BUILD_NUMBER,
                'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
            }
        }
    },
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
