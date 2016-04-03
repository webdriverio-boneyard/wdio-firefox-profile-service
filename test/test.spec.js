describe('firefox profile service', function () {
    it('should have a firefox profile in the capabilties', function () {
        browser.desiredCapabilities.should.have.property('firefox_profile')
    })

    it('should have set preferences properly', function () {
        browser.getUrl().should.be.equal('http://webdriver.io/')
    })

    it('should have installed the extension', function () {
        browser.getText('.header').should.be.equal('WebdriverIOTestExtension successfully installed!'.toUpperCase())
    })
})
